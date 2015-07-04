'use strict';

describe('Controller: CartController', function() {

  // load the controller's module
  beforeEach(module('tmaClientApp'));

  var CartController,
    rootScope,
    scope,
    location;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($controller, $rootScope, $location) {
    rootScope = $rootScope;
    scope = $rootScope.$new();
    location = $location;

    CartController = $controller('CartController', {
      $scope: scope,
    });
  }));

  it('should have basket object on the scope', function() {
    expect(scope.basket).toBeDefined();
  });

  describe('$scope.checkout', function() {
    it('should redirect to checkout view', function() {
      location.path('/cart');
      rootScope.$apply();
      expect(location.path()).toBe('/cart');

      scope.checkout();
      expect(location.path()).toBe('/checkout');
    });
  });
});
