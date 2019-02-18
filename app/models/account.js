var mongoose = require('mongoose');

module.exports = mongoose.model('accounts', { //collection of Mongodb
    username: {
        type: String,
        default: ''
    },
    password: {
      type: String,
      default: ''
    }
});
