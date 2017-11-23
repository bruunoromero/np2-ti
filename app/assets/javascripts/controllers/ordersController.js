angular.module("app").controller("OrdersController", [
  "$scope",
  "$location",
  "SessionAPI",
  function($scope, $location, SessionAPI) {
    SessionAPI.orders(function(orders) {
      $scope.orders = orders;
    });
  }
]);
