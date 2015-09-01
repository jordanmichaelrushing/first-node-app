angular.module('mean.system').controller('HeaderController', ['$scope', 'Global', function ($scope, Global) {
    $scope.global = Global;

    $scope.menu = {
        "title": "Random Poll",
        "link": ""
    };
    $scope.adminMenu = [{
        "title": "Create New Poll",
        "link": "polls/create"
    },{
        "title": "All Polls",
        "link": "polls"
    }];
    
    $scope.isCollapsed = false;
}]);