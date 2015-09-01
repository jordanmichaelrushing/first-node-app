/**
 * Module dependencies.
 */
var db = require('../../config/sequelize');

/**
 * Find poll by id
 * Note: This is called every time that the parameter :pollId is used in a URL. 
 * Its purpose is to preload the poll on the req object then call the next function. 
 */
exports.poll = function(req, res, next, id) {
    console.log('id => ' + id);
    db.Poll.find({ where: {id: id}, include: [db.User]}).then(function(poll){
        if(!poll) {
            return next(new Error('Failed to load poll ' + id));
        } else {
            req.poll = poll;
            return next();            
        }
    }).catch(function(err){
        return next(err);
    });
};

/**
 * Create a poll
 */
exports.create = function(req, res) {
    // augment the poll by adding the UserId
    req.body.UserId = req.user.id;
    // save and return and instance of poll on the res object. 
    db.Poll.create(req.body).then(function(poll){
        if(!poll){
            return res.send('users/signup', {errors: err});
        } else {
            return res.jsonp(poll);
        }
    }).catch(function(err){
        return res.send('users/signup', { 
            errors: err,
            status: 500
        });
    });
};

/**
 * Update a poll
 */
exports.update = function(req, res) {

    // create a new variable to hold the poll that was placed on the req object.
    var poll = req.poll;

    poll.updateAttributes({
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
 * Delete an poll
 */
exports.destroy = function(req, res) {

    // create a new variable to hold the poll that was placed on the req object.
    var poll = req.poll;

    poll.destroy().then(function(){
        return res.jsonp(poll);
    }).catch(function(err){
        return res.render('error', {
            error: err,
            status: 500
        });
    });
};

/**
 * Show an poll
 */
exports.show = function(req, res) {
    // Sending down the poll that was just preloaded by the polls.poll function
    // and saves poll on the req object.
    return res.jsonp(req.poll);
};

/**
 * List of Polls
 */
exports.all = function(req, res) {
    console.log('req.user');
    console.log(req.user);
    console.log('req.user');
    if (!req.user || !req.user.admin) {
        res.redirect('/#!/');
    } else {
        var pollResults = "SELECT Polls.*, Answers.content, COUNT(Answers.id) as count FROM Polls LEFT OUTER JOIN Answers on Answers.PollId = Polls.id ";
            pollResults += "GROUP BY Answers.content ORDER BY Polls.id ASC;";
        db.Poll.sequelize.query(pollResults)
            .then(function(polls){
                return res.jsonp(polls[0]);
        }).catch(function(err){
            return res.render('error', {
                error: err,
                status: 500
            });
        });
    }
};

exports.random = function(req, res) {
    db.Poll.sequelize.query("SELECT Polls.* FROM Polls WHERE `Polls`.`id` NOT IN (SELECT Answers.PollId FROM Answers WHERE Answers.UserId = :userId) ORDER BY RAND() LIMIT 1;",
      {replacements: {userId: req.user.id}}).then(function(results, metadata) {
        if (results && results[0]) {
            poll = results[0][0];
        } else {
            poll = null;
        }
        return res.jsonp({poll: poll});
    });
};
/**
 * Poll authorizations routing middleware
 */
exports.isAdmin = function(req, res, next) {
    console.log('req.user');
    console.log(req.user);
    console.log('req.user');
    if (!req.user.admin) {
        return res.send(401, 'User is not authorized');
    }
    next();
};

exports.hasAuthorization = function(req, res, next) {
    if (req.poll.User.id != req.user.id && !req.user.admin) {
      return res.send(401, 'User is not authorized');
    }
    next();
};
