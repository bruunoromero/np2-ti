angular.module("app", ["ngRoute"]).run([
  "$rootScope",
  "$location",
  function($rootScope, $location) {
    $rootScope.location = $location;

    $rootScope.user = {};

    $rootScope.cart = [];

    $rootScope.isIndex = function() {
      return $location.path() === "/";
    };

    $rootScope.shouldShowSidebar = function() {
      return $location.path() === "/" || $location.path().startsWith("/albums");
    };
  }
]);

//= require_tree ./filters
//= require_tree ./services
//= require_tree ./directives
//= require_tree ./controllers
//= require routes
