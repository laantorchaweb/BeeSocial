var mongoose = require('mongoose');
var Account = require('../models/account')(mongoose);

mongoose.connect('mongodb://localhost/BeeSocial');

var db = mongoose.connection;

exports.index = function(req, res){
  res.render('index', { title: 'BeeSocial' });
};

exports.register = function(req, res) {
    var firstName = req.param('firstName', ''),
        lastName  = req.param('lastName', ''),
        email     = req.param('email', null),
        password  = req.param('password', null);

    if ( null == email || email.length < 1 || null == password || password.length < 1 ) {
      res.send(400);
      return;
    }

    Account.register(email, password, firstName, lastName);
    res.redirect('/');
}

exports.login = function(req, res){
    var email    = req.body.email,
        password = req.body.password;

  if ( null == email || email.length < 1 || null == password || password.length < 1 ) {
    res.send(400);
    return;
  }

  Account.login(email, password, function(doc) {
    if ( !doc ) {
      res.send(401);
      return;
    }
    console.log('login was successful');
    req.session.loggedIn  = true;
    req.session.accountId = doc._id;
    console.log(doc)
    res.redirect('/' + doc.username);
  });

};

exports.home = function(req, res) {
  var url = req.params.id;

  if ( req.session.loggedIn ) {

    Account.findByUsername({username: url}, function(doc) {
        console.log("document: ", doc);
        res.render('home', {
          title: 'BeeSocial',
          user: doc
        });

    });

  } else if( url === 'register' ) {

      res.render('register', {title: 'register'});

  } else {
    res.send(401);
  }

}

exports.inbox = function(req, res) {

  if ( req.session.loggedIn ) {

    Account.findById(req.session.accountId, function(doc) {

        res.render('inbox', {
          title: 'BeeSocial',
          user: doc
        });

    });

  } else {
    res.send(401);
  }
}
