/**
 * Module dependencies.
 */
var _ = require('lodash');

exports.render = function(req, res) {
  if (!req.user){
    res.render('users/signin', {
        title: 'Signin',
        message: req.flash('error')
    });
  } else {
    res.render('index', {
      user: JSON.stringify(req.user)
    });
  }
};