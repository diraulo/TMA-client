'use strict';

/**
 * @ngdoc function
 * @name tmaClientApp.controller:MainCtrl
 * @description
 * # MenuController
 * Controller of the tmaClientApp
 */
app.controller('MenuController', function($scope, Menu, Basket) {
  Menu.getMenus().$promise.then(function(response) {
    $scope.menus = response;
  });
  $scope.basket = Basket;

  $scope.isVisible = function(menu) {
    var now = new Date('2015-07-07');
    var menuEndDate = new Date(menu.end_date);
    if (menuEndDate >= now) { return true; }
    return false;
  };
});
