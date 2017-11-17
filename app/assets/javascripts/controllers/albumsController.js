angular.module("app").controller("AlbumsController", [
  "$scope",
  "product",
  function($scope, product) {
    var getImageName = function(name) {
      var res = name.toLowerCase();
      res = res.replace(/\s/g, "_").replace("/", ":");
      if (res === "purpose") {
        res += "_square";
      }

      return "/images/" + res + ".jpg";
    };

    $scope.splittedTracks = (function() {
      var songs = [];
      var each = [];
      for (var i = 1; i < product.tracks.length + 1; i++) {
        each.push(product.tracks[i - 1]);
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

    $scope.product = product;
    $scope.product.imageUrl = getImageName(product.title);
  }
]);
