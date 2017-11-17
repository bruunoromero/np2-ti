angular.module("app").controller("HomeController", [
  "$scope",
  "$rootScope",
  "sections",
  function($scope, $rootScope, sections) {
    $scope.sections = sections.slice(2);
    $rootScope.sidebarSections = sections.slice(0, 2);
  }
]);
