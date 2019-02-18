// set up
var express = require('express');
var app = express(); 	
var mongoose = require('mongoose'); 
var port = process.env.PORT || 3000;
var database = require('./config/database');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var Account = require('./app/models/account');
var session = require('express-session');
var flash = require('connect-flash');

// configuration
app.use(express.static(__dirname + '/public')); 
app.use(morgan('dev')); // log every request to the console
app.use(bodyParser.urlencoded({'extended': 'true'})); 
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({type: 'application/vnd.api+json'})); // parse application/vnd.api+json as json
app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request
app.use(session({ cookie: { maxAge: 60000 }, 
  secret: 'wong',
  resave: false, 
  saveUninitialized: false}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());


mongoose.connect(database.localUrl, { useNewUrlParser: true });
passport.use(new LocalStrategy(
    function(username, password, done) {
      Account.findOne({ username: username }, function(err, user) {
        if (err) { return done(err); }
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }
        if (user.password != password) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
      });
    }
  ));

// 将用户写进session
passport.serializeUser(function (user, done) {//保存user对象
  done(null, user);//可以通过数据库方式操作
});                          

// 将用户从session里面删除
passport.deserializeUser(function (user, done) {//删除user对象
  done(null, user);//可以通过数据库方式操作
});

app.post('/login', passport.authenticate('local', {
  successRedirect: '/order',  // 登录失败就会跳转到这个页面
  failureRedirect: '/',  // 登录失败就会跳转到这个页面
  badRequestMessage: 'username or password is empty',
  failureFlash: true }));

app.use(function (req, res, next) {
  // 没有登录就跳转到登录页  
  if(!req.session.passport || !req.session.passport.user){
    res.redirect('/');
  }
  next()
})

// route
require('./app/routes.js')(app);

// listen
app.listen(port);
console.log("App listening on port " + port);
