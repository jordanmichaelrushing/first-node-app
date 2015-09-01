angular.module('mean.answers').controller('AnswersController', ['$scope', '$routeParams', '$window', '$location', 'Global', 'Answers', function ($scope, $routeParams, $window, $location, Global, Answers) {
    $scope.global = Global;

    $scope.create = function() {
        var answer = new Answers({
            content: this.content,
            UserId: $scope.global.user.id,
            PollId: $scope.pollId
        });

        answer.$save(function(response) {
            console.log(response);
            $window.location.reload();
        });
    };

    $scope.remove = function(answer) {
        if (answer) {
            answer.$remove();  

            for (var i in $scope.answers) {
                if ($scope.answers[i] == answer) {
                    $scope.answers.splice(i, 1);
                }
            }
        }
        else {
            $scope.answer.$remove();
            $location.path('answers');
        }
    };

    $scope.update = function() {
        var answer = $scope.answer;
        if (!answer.updated) {
            answer.updated = [];
        }
        answer.updated.push(new Date().getTime());

        answer.$update(function() {
            $location.path('answers/' + answer.id);
        });
    };

    $scope.random = function() {
        Answers.query({limit: 10}, function(answers) {
            $scope.answers = answers;
        });
    };

    $scope.all = function() {
        Answers.query(function(answers) {
            $scope.answers = answers;
        });
    };

    $scope.findOne = function() {
        Answers.get({
            answerId: $routeParams.answerId
        }, function(answer) {
            console.log(answer);
            $scope.answer = answer;
        });
    };
}]);