angular.module("app").controller("HomeController", [
  "$scope",
  "sections",
  function($scope, sections) {
    $scope.sections = sections;
  }
]);
