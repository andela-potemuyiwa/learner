var mongoose   = require('mongoose'),
    db         = require('./db'),
    crypto     = require('crypto'),
    User       = require('../server/models/user.model');

var db = mongoose.connection;

module.exports = {
  dbconnect: function(){
    db.on('error', console.error.bind( console, 'connection...error'));
    db.once('open', function callback(){
      console.log('learner db opened');
    });
  }
};

User.find({}).exec( function(err, doc){
  if( doc.length === 0 ){
    var salt, hash;
    salt = createSalt();
    hash = hashPwd( salt, 'unicodeveloper');
    User.create({ username: 'unicodeveloper',email: 'prosperotemuyiwa@gmail.com', salt: salt, h_password: hash, user_avatar: ""});
    salt = createSalt();
    hash = hashPwd( salt, 'unicodeveloper');
    User.create({ username: 'busayo',email: 'potemuyiwa@gmail.com', salt: salt, h_password: hash, user_avatar: ""});
    salt = createSalt();
    hash = hashPwd( salt, 'unicodeveloper');
    User.create({ username: 'prosper',email: 'otemuyiwa@gmail.com', salt: salt, h_password: hash, user_avatar: ""});
  }
});


