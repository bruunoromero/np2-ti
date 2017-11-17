angular.module("app").controller("HomeController", [
  "$scope",
  "$rootScope",
  "sections",
  function($scope, $rootScope, sections) {
    if (sections && sections.length) {
      localStorage.setItem("sections", JSON.stringify(sections.slice(0, 2)));
    }

    $scope.sections = sections.slice(2);
    $rootScope.sidebarSections = sections.slice(0, 2);
  }
]);
