
'use strict';

/**
* Module dependencies.
*/
var users = require('../../app/controllers/users'),
answers = require('../../app/controllers/answers');

module.exports = function(app) {
// Answer Routes
app.route('/answers')
    .get(answers.all, answers.isAdmin)
    .post(users.requiresLogin, answers.create);
app.route('/answers/:answerId')
    .get(answers.show, answers.hasAuthorization)
    .put(users.requiresLogin, answers.hasAuthorization, answers.update)
    .delete(users.requiresLogin, answers.hasAuthorization, answers.destroy);

// Finish with setting up the answerId param
// Note: the answers.answer function will be called everytime then it will call the next function.
app.param('answerId', answers.answer);
};

