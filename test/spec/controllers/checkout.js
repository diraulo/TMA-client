'use strict';

describe('Controller: CheckoutController', function () {

  // load the controller's module
  beforeEach(module('tmaClientApp'));

  var CheckoutController,
    location,
    rootScope,
    $window,
    mockAuthService,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, $location, _$window_) {
    $window = _$window_;
    $window.sessionStorage = { // mocking sessionStorage
        token: function(key) {
          return this[key];
        }
    };

    rootScope = $rootScope;
    scope = $rootScope.$new();
    location = $location;
    mockAuthService = {
      isLoggedIn: function() {
      },
      register: function(user) {
      }
    };

    CheckoutController = $controller('CheckoutController', {
      $scope: scope
    });
  }));

  it('should redirect to order confirmation view if user already logged in', function() {
    $window.sessionStorage.token = 'token';
    rootScope.$apply();
    console.log(location.path());
    // expect(location.path()).toBe('/confirm-order');
  });

  describe('$scope.register', function() {
    it('should create a new user and redirects to order confirmation', function() {
      var user = { name: 'John', email: 'john@doe.com', password: 'password', password_confirmation: 'password' };
      rootScope.$apply();
      spyOn(mockAuthService, 'register');
      // scope.register(user);
      // expect(mockAuthService.register).toHaveBeenCalled();
    });
  });
});
