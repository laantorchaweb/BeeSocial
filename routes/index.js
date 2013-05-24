var mongoose = require('mongoose');
var Account = require('../models/account')(mongoose);

mongoose.connect('mongodb://localhost/BeeSocial');

var db = mongoose.connection;

exports.index = function(req, res){
  res.render('index', { title: 'BeeSocial' });
};

exports.register = function(req, res) {
    var firstName = req.param('firstName', '');
    var lastName = req.param('lastName', '');
    var email = req.param('email', null);
    var password = req.param('password', null);

    if ( null == email || email.length < 1 || null == password || password.length < 1 ) {
      res.send(400);
      return;
    }

    Account.register(email, password, firstName, lastName);
    res.send(200);
}

exports.login = function(req, res){
    var email    = req.body.email,
        password = req.body.password;

  if ( null == email || email.length < 1 || null == password || password.length < 1 ) {
    res.send(400);
    return;
  }

  Account.login(email, password, function(success) {
    if ( !success ) {
      res.send(401);
      return;
    }
    console.log('login was successful');
    req.session.loggedIn = true;
    res.redirect('/home');
  });

};
