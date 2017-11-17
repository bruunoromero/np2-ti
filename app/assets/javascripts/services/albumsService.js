angular.module("app").service("AlbumsAPI", [
  "$http",
  function($http) {
    this.getSections = function() {
      return $http.get("/api/albums").then(function(response) {
        return response.data;
      });
    };
  }
]);
