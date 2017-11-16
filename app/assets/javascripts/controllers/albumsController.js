angular.module("app").controller("AlbumsController", [
  "$scope",
  "product",
  "tracks",
  "sections",
  function($scope, product, tracks, sections) {
    $scope.product = product;
    $scope.sections = sections;
    $scope.tracks = tracks;
    $scope.splittedTracks = (function() {
      var songs = [];
      var each = [];
      for (var i = 1; i < tracks.length + 1; i++) {
        each.push(tracks[i - 1]);
        if (i % 5 === 0 && i !== 0) {
          songs.push(each);
          each = [];
        }
      }
      if (each.length !== 0) {
        songs.push(each);
      }

      return songs;
    })();
  }
]);
