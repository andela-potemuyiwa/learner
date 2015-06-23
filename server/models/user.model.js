var mongoose   = require('mongoose'),
    bcrypt     = require('bcrypt'),
    userSchema =  mongoose.Schema({
    username:      { type: String, required: true },
    email:         { type: String, required: true, unique: true },
    h_password:    { type: String, required: true },
    user_avatar:   { type: String, default: 'http://prosperotemuyiwa.com' },
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

// userSchema.methods.hashPassword = function(userpassword) {
//   return bcrypt.hashSync(userpassword, bcrypt.genSaltSync(10), null);
// };

// userSchema.methods.comparePassword = function(requestPassword, dbpassword, cb) {
//   bcrypt.compare(requestPassword, dbpassword, cb);
// };

module.exports = mongoose.model('User', userSchema, 'users');