//Setting up route
angular.module('mean').config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        when('/polls/create', {
            templateUrl: 'views/polls/create.html'
        }).
        when('/polls/', {
            templateUrl: 'views/polls/list.html'
        }).
        when('/polls/:pollId/edit', {
            templateUrl: 'views/polls/edit.html'
        }).
        when('/', {
            templateUrl: 'views/index.html'
        }).
        otherwise({
            redirectTo: '/'
        });
    }
]);

//Setting HTML5 Location Mode
angular.module('mean').config(['$locationProvider',
    function($locationProvider) {
        $locationProvider.hashPrefix("!");
    }
]);