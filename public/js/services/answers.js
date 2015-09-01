//Answers service used for answers REST endpoint
angular.module('mean.answers').factory("Answers", ['$resource', function($resource) {
    return $resource('answers/:answerId', {
        articleId: '@id'
    });
}]);