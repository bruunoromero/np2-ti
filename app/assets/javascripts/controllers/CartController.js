angular.module("app").controller("CartController", [
  "$scope",
  function($scope) {
    $scope.products = [
      {
        title: "College",
        artist: "The Chainsmokers",
        id: 1,
        quantity: 2,
        price: 9.9,
        imageUrl: "/images/College.jpg"
      }
    ];
  }
]);
