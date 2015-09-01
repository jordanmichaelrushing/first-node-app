angular.module('mean.polls').controller('PollsController', ['$scope', '$routeParams', '$location', 'Global', 'Polls', 'Answers', function ($scope, $routeParams, $location, Global, Polls, Answers) {
    $scope.global = Global;

    $scope.create = function() {
        var poll = new Polls({
            title: this.title,
            question_one: this.question_one,
            question_two: this.question_two,
            question_three: this.question_three,
            question_four: this.question_four
        });

        poll.$save(function(response) {
            console.log(response);
            $location.path("polls/" + response.id);
        });

        this.title = "";
        this.question_one = "";
        this.question_two = "";
        this.question_three = "";
        this.question_four = "";
    };

    $scope.remove = function(poll) {
        if (poll) {
            poll.$remove();  

            for (var i in $scope.polls) {
                if ($scope.polls[i] == poll) {
                    $scope.polls.splice(i, 1);
                }
            }
        }
        else {
            $scope.poll.$remove();
            $location.path('polls');
        }
    };

    $scope.update = function() {
        var poll = $scope.poll;
        if (!poll.updated) {
            poll.updated = [];
        }
        poll.updated.push(new Date().getTime());

        poll.$update(function() {
            $location.path('polls/' + poll.id);
        });
    };

    $scope.all = function() {
        if ($scope.global.user.admin) {
            Polls.query(function(data){
                var finalPolls = {};
                data.forEach(function(i){
                    if (!finalPolls[i.title]) {
                        finalPolls[i.title] = {};
                        finalPolls[i.title].title = i.title;
                        finalPolls[i.title].questions = {};
                        finalPolls[i.title].questions[i.question_one] = 0;
                        finalPolls[i.title].questions[i.question_two] = 0;
                        finalPolls[i.title].questions[i.question_three] = 0;
                        finalPolls[i.title].questions[i.question_four] = 0;
                        finalPolls[i.title].total = 0;
                    }
                    if (i.content){
                        finalPolls[i.title].questions[i.content] = i.count;
                        finalPolls[i.title].total += i.count;
                    }
                });
                $scope.polls = finalPolls;
            });
        } else {
            $location.path("/#!/");
        }
    };

    $scope.random = function() {
        Polls.getData(function(poll) {
            $scope.poll = poll;
            console.log(!$scope.poll);
            console.log($scope.poll);
            $scope.pollId = poll.id;
        });
    };

    $scope.findOne = function() {
        Polls.get({
            pollId: $routeParams.pollId
        }, function(poll) {
            $scope.poll = poll;
        });
    };
}]);