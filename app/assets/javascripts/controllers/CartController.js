angular.module("app").controller("CartController", [
  "$scope",
  "SessionAPI",
  function($scope, SessionAPI) {
    $scope.getProducts = function() {
      return SessionAPI.getCart();
    };
  }
]);
