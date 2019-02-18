'use strict';
var FoodOrder = require('./models/foodorder');
var path = require('path');

function getOrders(res) {
    FoodOrder.find(function (err, orders) {
      
        if (err) {
            res.send(err);
        }

        res.json(orders); // return all orders in JSON format
    });
};

function timeStampToTime(timestamp){ // 时间戳转为时间
    var date = new Date(timestamp);
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    var D = date.getDate() + ' ';
    var h = date.getHours() + ':';
    var m = date.getMinutes() + ':';
    var s = date.getSeconds();
    var time = Y+M+D;
    return time;
}


module.exports = function (app) {

//-------------------------Order---------------------------
    // get all orders
    app.get('/api/food', function (req, res) {
        getOrders(res);
    });

    // create order and send back all orders after creation
    app.post('/api/food', function (req, res) {
        // create a order, information comes from AJAX request from Angular

        FoodOrder.create({
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            url: req.body.url,
            category: req.body.category,
            createdate: req.body.createdate,
            theday: req.body.theday
        }, function (err, order) {
            if (err)
                res.send(err);
            // get and return all the orders after you create another
            getOrders(res);
            //res.send("success");
        });

        /*
        FoodOrder.findOne({createdate:new Date().getDay()},function(err,docs){
            console.log(docs);
            var sum = 0;
            for(var item in docs){
                sum += item.price;
            }
            console.log(docs,sum,new Date().getDay());
            if(sum>60) {
                res.send({stat:0,msg:'over 60~'});
            }
            // TODO
            // 如果总金额加起来超过40 
            
        });
       */

    });

    // delete a order
    app.delete('/api/food/:food_id/:create_date', function (req, res) {
        var create_date = timeStampToTime(req.params.create_date); 
        var current_date = timeStampToTime(new Date());
        console.log(create_date,current_date);
        if(create_date != current_date){
            res.send({stat:'0',msg:'can not delete'});     
        } 
        FoodOrder.remove({
            _id: req.params.food_id
        }, function (err, order) {
            if (err)
                res.send(err);

            getOrders(res);
        });
    });

    // get all order's totals
    app.get('/api/total', function (req, res) {
        getOrders(res);
    });

    app.get('/api/food/delete', function (req, res) {
        FoodOrder.update({
            _id:req.params.food_id
        },{
            status:'canceled'
        }, function (err, order) {
            if (err)
                res.send(err);
            getOrders(res);
        });

    });

//-----------------------Application---------------------------

/*
    app.get('*', function (req, res) {
        res.sendFile(__dirname + '/public/index.html'); 
    });

    app.get('/order', function (req, res) {
        res.sendFile(__dirname + '/public/order.html'); 
    }); 
*/

    app.get('/', function (req, res) {
        res.sendFile(path.resolve('public/index.html'));  
    }); 

    app.get('/sess',function(req, res){
        let sess = req.session;
        console.log(`session id is: ${sess.id}`)
        res.json(sess);
    });

    app.get('/order', function (req, res) {
        res.sendFile(path.resolve('public/order.html')); 
    }); 

    app.get('/history', function (req, res) {
        res.sendFile(path.resolve('public/history.html')); 
    }); 

    app.get('/logout',function(req,res){
        req.logout();
        res.redirect('/');
    });

    
};
