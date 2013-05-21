var mongoose        = require('mongoose'),
    db_lnk          = 'mongodb://localhost/beeSocial',
    db              = mongoose.createConnection(db_lnk)

exports.index = function(req, res){
  res.render('index', { title: 'BeeSocial' });
};

exports.login = function(req, res){
    console.log(req.body);
  res.render('index', { title: 'BeeSocial' });
};
