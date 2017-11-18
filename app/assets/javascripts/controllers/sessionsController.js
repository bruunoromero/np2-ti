angular.module("app").controller("SessionsController", [
  "$scope",
  "$location",
  "SessionAPI",
  function($scope, $location, SessionAPI) {
    $scope.login = {};
    $scope.register = {};

    $scope.makeLogin = function(e) {
      if ($scope.loginForm.$valid) {
        SessionAPI.login($scope.login, function(data) {
          console.log(data);
          $location.path("/");
        });
      }
    };

    $scope.makeRegister = function(e) {
      console.log($scope.register);
      if ($scope.registerForm.$valid) {
        SessionAPI.register($scope.register, function(data) {
          console.log(data);
          $location.path("/");
        });
      }
    };
  }
]);
