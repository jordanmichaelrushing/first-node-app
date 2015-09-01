/**
 * Module dependencies.
 */
var db = require('../../config/sequelize');

/**
 * Find answer by id
 * Note: This is called every time that the parameter :answerId is used in a URL. 
 * Its purpose is to preload the answer on the req object then call the next function. 
 */
exports.answer = function(req, res, next, id) {
    console.log('id => ' + id);
    db.Answer.find({ where: {id: id}, include: [db.User]}).then(function(answer){
        if(!answer) {
            return next(new Error('Failed to load answer ' + id));
        } else {
            req.answer = answer;
            return next();            
        }
    }).catch(function(err){
        return next(err);
    });
};

/**
 * Create an answer
 */
exports.create = function(req, res) {
    // augment the answer by adding the UserId
    req.body.UserId = req.user.id;
    // save and return and instance of answer on the res object. 
    db.Answer.create(req.body).then(function(answer){
        if(!answer){
            return res.send('users/signup', {errors: err});
        } else {
            return res.jsonp(answer);
        }
    }).catch(function(err){
        return res.send('users/signup', { 
            errors: err,
            status: 500
        });
    });
};

/**
 * Update an answer
 */
exports.update = function(req, res) {

    // create a new variable to hold the answer that was placed on the req object.
    var answer = req.answer;

    answer.updateAttributes({
        title: req.body.title,
        content: req.body.content
    }).then(function(a){
        return res.jsonp(a);
    }).catch(function(err){
        return res.render('error', {
            error: err, 
            status: 500
        });
    });
};

/**
 * Delete an answer
 */
exports.destroy = function(req, res) {

    // create a new variable to hold the answer that was placed on the req object.
    var answer = req.answer;

    answer.destroy().then(function(){
        return res.jsonp(answer);
    }).catch(function(err){
        return res.render('error', {
            error: err,
            status: 500
        });
    });
};

/**
 * Show an answer
 */
exports.show = function(req, res) {
    // Sending down the answer that was just preloaded by the answers.answer function
    // and saves answer on the req object.
    return res.jsonp(req.answer);
};

/**
 * List of Answers
 */
exports.all = function(req, res) {
    db.Answer.findAll({include: [db.User]}).then(function(answers){
        return res.jsonp(answers);
    }).catch(function(err){
        return res.render('error', {
            error: err,
            status: 500
        });
    });
};

/**
 * Answer authorizations routing middleware
 */
exports.isAdmin = function(req, res, next) {
    if (!req.user.admin) {
        return res.send(401, 'User is not authorized');
    }
    next();
};

exports.hasAuthorization = function(req, res, next) {
    if (req.answer.User.id != req.user.id && !req.user.admin) {
      return res.send(401, 'User is not authorized');
    }
    next();
};
