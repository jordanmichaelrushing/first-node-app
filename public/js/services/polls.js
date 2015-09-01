//Polls service used for polls REST endpoint
angular.module('mean.polls').factory("Polls", ['$resource', function($resource) {
    return $resource('polls/:pollId', {
        articleId: '@id'
    }, {
        update: {
            method: 'PUT'
        },
        getData: {
            method: 'GET', url: "/poll/random"
        },
        get: {
            method: 'GET', url: "/poll/all"
        }
    });
}]);

angular.module('mean.answers').factory("Answers", ['$resource', function($resource) {
    return $resource('answers/:answerId', {
        articleId: '@id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);