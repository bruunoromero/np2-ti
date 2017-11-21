angular.module("app").controller("CartController", [
  "$scope",
  "$location",
  "SessionAPI",
  function($scope, $location, SessionAPI) {
    $scope.card = {};

    $scope.products = SessionAPI.getCart();

    $scope.updateQuantity = function(product) {
      SessionAPI.setQuantity(product);
    };

    $scope.remove = function(product) {
      SessionAPI.remove(product);
    };

    $scope.checkout = function() {
      var user = SessionAPI.getCurrentUser();

      if (!user) {
        return $location.path("/sessions");
      }

      var card = user.card;
      if (card && card.number) {
        SessionAPI.checkout();
      } else {
        $("#modal-card").modal("show");
      }
    };

    $scope.addCard = function() {
      if (
        $scope.cardForm.$valid &&
        $scope.card.number.toString().length === 16 &&
        $scope.card.securityCode.toString().length === 3
      ) {
        SessionAPI.addCard($scope.card, function(res) {
          $("#modal-card").modal("hide");
        });
      }
    };
  }
]);
