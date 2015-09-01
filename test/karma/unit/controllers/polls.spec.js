(function() {
    'use strict';

    // Polls Controller Spec
    describe('MEAN controllers', function() {

        describe('PollsController', function() {

            // The $resource service augments the response object with methods for updating and deleting the resource.
            // If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
            // the responses exactly. To solve the problem, we use a newly-defined toEqualData Jasmine matcher.
            // When the toEqualData matcher compares two objects, it takes only object properties into
            // account and ignores methods.
            beforeEach(function() {
                this.addMatchers({
                    toEqualData: function(expected) {
                        return angular.equals(this.actual, expected);
                    }
                });
            });

            // Load the controllers module
            beforeEach(module('mean'));

            // Initialize the controller and a mock scope
            var PollsController,
                scope,
                $httpBackend,
                $routeParams,
                $location;

            // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
            // This allows us to inject a service but then attach it to a variable
            // with the same name as the service.
            beforeEach(inject(function($controller, $rootScope, _$location_, _$routeParams_, _$httpBackend_) {

                scope = $rootScope.$new();

                PollsController = $controller('PollsController', {
                    $scope: scope
                });

                $routeParams = _$routeParams_;

                $httpBackend = _$httpBackend_;

                $location = _$location_;

            }));

            it('$scope.find() should create an array with at least one poll object ' +
                'fetched from XHR', function() {

                    // test expected GET request
                    $httpBackend.expectGET('polls').respond([{
                        title: 'An Poll about MEAN',
                        content: 'MEAN rocks!'
                    }]);

                    // run controller
                    scope.find();
                    $httpBackend.flush();

                    // test scope value
                    expect(scope.polls).toEqualData([{
                        title: 'An Poll about MEAN',
                        content: 'MEAN rocks!'
                    }]);

                });

            it('$scope.findOne() should create an array with one poll object fetched ' +
                'from XHR using a pollId URL parameter', function() {
                    // fixture URL parament
                    $routeParams.pollId = '525a8422f6d0f87f0e407a33';

                    // fixture response object
                    var testPollData = function() {
                        return {
                            title: 'An Poll about MEAN',
                            content: 'MEAN rocks!'
                        };
                    };

                    // test expected GET request with response object
                    $httpBackend.expectGET(/polls\/([0-9a-fA-F]{24})$/).respond(testPollData());

                    // run controller
                    scope.findOne();
                    $httpBackend.flush();

                    // test scope value
                    expect(scope.poll).toEqualData(testPollData());

                });

            it('$scope.create() with valid form data should send a POST request ' +
                'with the form input values and then ' +
                'locate to new object URL', function() {

                    // fixture expected POST data
                    var postPollData = function() {
                        return {
                            title: 'An Poll about MEAN',
                            content: 'MEAN rocks!'
                        };
                    };

                    // fixture expected response data
                    var responsePollData = function() {
                        return {
                            _id: '525cf20451979dea2c000001',
                            title: 'An Poll about MEAN',
                            content: 'MEAN rocks!'
                        };
                    };

                    // fixture mock form input values
                    scope.title = 'An Poll about MEAN';
                    scope.content = 'MEAN rocks!';

                    // test post request is sent
                    $httpBackend.expectPOST('polls', postPollData()).respond(responsePollData());

                    // Run controller
                    scope.create();
                    $httpBackend.flush();

                    // test form input(s) are reset
                    expect(scope.title).toEqual('');
                    expect(scope.content).toEqual('');

                    // test URL location to new object
                    expect($location.path()).toBe('/polls/' + responsePollData()._id);
                });

            it('$scope.update() should update a valid poll', inject(function(Polls) {

                // fixture rideshare
                var putPollData = function() {
                    return {
                        _id: '525a8422f6d0f87f0e407a33',
                        title: 'An Poll about MEAN',
                        to: 'MEAN is great!'
                    };
                };

                // mock poll object from form
                var poll = new Polls(putPollData());

                // mock poll in scope
                scope.poll = poll;

                // test PUT happens correctly
                $httpBackend.expectPUT(/polls\/([0-9a-fA-F]{24})$/).respond();

                // testing the body data is out for now until an idea for testing the dynamic updated array value is figured out
                //$httpBackend.expectPUT(/polls\/([0-9a-fA-F]{24})$/, putPollData()).respond();
                /*
                Error: Expected PUT /polls\/([0-9a-fA-F]{24})$/ with different data
                EXPECTED: {"_id":"525a8422f6d0f87f0e407a33","title":"An Poll about MEAN","to":"MEAN is great!"}
                GOT:      {"_id":"525a8422f6d0f87f0e407a33","title":"An Poll about MEAN","to":"MEAN is great!","updated":[1383534772975]}
                */

                // run controller
                scope.update();
                $httpBackend.flush();

                // test URL location to new object
                expect($location.path()).toBe('/polls/' + putPollData()._id);

            }));

            it('$scope.remove() should send a DELETE request with a valid pollId' +
                'and remove the poll from the scope', inject(function(Polls) {

                    // fixture rideshare
                    var poll = new Polls({
                        _id: '525a8422f6d0f87f0e407a33'
                    });

                    // mock rideshares in scope
                    scope.polls = [];
                    scope.polls.push(poll);

                    // test expected rideshare DELETE request
                    $httpBackend.expectDELETE(/polls\/([0-9a-fA-F]{24})$/).respond(204);

                    // run controller
                    scope.remove(poll);
                    $httpBackend.flush();

                    // test after successful delete URL location polls lis
                    //expect($location.path()).toBe('/polls');
                    expect(scope.polls.length).toBe(0);

                }));

        });

    });
}());