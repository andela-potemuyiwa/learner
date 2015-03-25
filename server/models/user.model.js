var mongoose = require('mongoose'),
    crypto     = require('crypto'),
    userSchema =  mongoose.Schema({
    username:      { type: String },
    email:         { type: String },
    salt:          { type: String },
    h_password:    { type: String },
    user_avatar:   { type: String },
    registered_on: { type: Date, default: Date.now }
});

userSchema.methods = {
  authenticate: function(passwordToMatch){
    return hashPwd(this.salt, passwordToMatch) === this.h_password;
  }
}

function hashPwd( salt, pwd){
  var hmac = crypto.createHash('sha1', salt);
  return hmac.update( pwd ).digest('hex');
}

module.exports = mongoose.model('User', userSchema, 'users');