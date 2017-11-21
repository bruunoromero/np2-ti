angular.module("app").controller("OrdersController", [
  "$scope",
  "SessionAPI",
  function($scope, SessionAPI) {
    SessionAPI.orders(function(orders) {
      $scope.orders = orders;
    });
  }
]);
