var mongoose   = require('mongoose');
var db         = require('./db');

var db = mongoose.connection;

module.exports = {
  dbconnect: function(){
    db.on('error', console.error.bind( console, 'connection...error'));
    db.once('open', function callback(){
      console.log('learner db opened');
    });
  }
};