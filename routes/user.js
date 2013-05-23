
exports.register = function(req, res){
  res.render('register', {title: 'register'});
};

exports.home = function(req, res) {

  if ( req.session.loggedIn ) {
    res.render('home', {title: 'home'});
  } else {
    res.send(401);
  }
  console.log(Account)
}


