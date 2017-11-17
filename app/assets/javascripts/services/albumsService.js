angular.module("app").service("AlbumsAPI", [
  "$http",
  function($http) {
    this.getSections = function() {
      return $http.get("/api/albums").then(function(response) {
        return response.data;
      });
    };

    this.getAlbum = function(id) {
      return $http.get("/api/albums/" + id).then(function(response) {
        return response.data;
      });
    };
  }
]);
