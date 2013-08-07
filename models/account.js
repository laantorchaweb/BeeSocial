var crypto = require('crypto');

module.exports = function(mongoose) {

  var userSchema = new mongoose.Schema({
      email:     { type: String, unique: true },
      password:  { type: String },
      username:  { type: String},
      name: {
        first:   { type: String },
        last:    { type: String }
      },
      birthday: {
        day:     { type: Number, min: 1, max: 31, required: false },
        month:   { type: Number, min: 1, max: 12, required: false },
        year:    { type: Number }
      },
      photoUrl:  { type: String },
      biography: { type: String }
  });

  var account = mongoose.model('Account', userSchema);

  var login = function(email, password, callback) {
    var shaSum = crypto.createHash('sha256');
    shaSum.update(password);

    account.findOne({email:email,password:shaSum.digest('hex')},function(err,doc){
      console.log('doc ', doc)
      callback(doc);
    });

  };

 var register = function(email, password, firstName, lastName, callback) {
    var shaSum = crypto.createHash('sha256');
    shaSum.update(password);

    console.log('Registering ' + email);

    var user = new account({
      email: email,
      name: {
        first: firstName,
        last: lastName
      },
      username: firstName.toLowerCase() + '.' + lastName.toLowerCase(),
      password: shaSum.digest('hex')
    });

    user.save(callback);
    console.log('Save command was sent');
  };

  var findById = function(id, callback) {

    account.findOne({_id:id}, function(err,doc) {
      callback(doc);
    });

  };

  var findByUsername = function(id, callback) {

    account.findOne({username: id.username}, function(err,doc) {
      callback(doc);
    });

  };

  return {
    login: login,
    register: register,
    findById: findById,
    findByUsername: findByUsername,
    account: account
  }
}
