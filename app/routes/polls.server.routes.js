
'use strict';

/**
* Module dependencies.
*/
var users = require('../../app/controllers/users'),
polls = require('../../app/controllers/polls');

module.exports = function(app) {
// Answer Routes
app.route('/polls')
    .get(polls.all, polls.isAdmin)
    .post(polls.isAdmin, polls.create);
app.route('/polls/:pollId')
    .put(users.requiresLogin, polls.hasAuthorization, polls.update)
    .delete(users.requiresLogin, polls.hasAuthorization, polls.destroy);
app.route('/poll/random')
    .get(polls.random);
app.route('/poll/all')
    .get(polls.all);

// Finish with setting up the pollId param
// Note: the polls.poll function will be called everytime then it will call the next function.
app.param('pollId', polls.poll);
};

