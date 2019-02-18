var mongoose = require('mongoose');

module.exports = mongoose.model('orders', { //collection of Mongodb
    name: {
        type: String,
        default: ''
    },
    price: {
      type: Number,
      default: ''
    },
    
    description:{
        type: String,
        default:''
    },

    category:{
        type: String,
        default:''
    },

    url:{
        type: String,
        default:''
    },

    createdate:{
        type: Date,
    },

    theday:{
        type: String,
        default:''
    }
    
});
