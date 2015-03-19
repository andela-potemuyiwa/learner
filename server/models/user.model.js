var mongoose = require('mongoose');
var userSchema =  mongoose.Schema({
    username:    { type: String },
    password:    { type: String },
    email:       { type: String },
    user_avatar: { type: String },
    registered_on: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema, 'users');