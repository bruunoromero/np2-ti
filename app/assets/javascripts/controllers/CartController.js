angular.module("app").controller("CartController", [
  "$scope",
  "SessionAPI",
  function($scope, SessionAPI) {
    $scope.getProducts = function() {
      return SessionAPI.getCart();
    };

    $scope.updateQuantity = function(product) {
      SessionAPI.setQuantity(product);
    };

    $scope.remove = function(product) {
      SessionAPI.remove(product);
    };
  }
]);
