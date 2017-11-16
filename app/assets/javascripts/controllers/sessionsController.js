angular.module("app").controller("SessionsController", [
  "$scope",
  "$location",
  function($scope, $location) {
    $scope.login = {};
    $scope.register = {};

    $scope.log = function(e) {
      e.preventDefault();
      $location.path("/");
    };

    $scope.register = function(e) {
      e.preventDefault();
      $location.path("/");
    };
  }
]);
