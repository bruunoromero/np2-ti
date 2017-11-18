angular.module("app").service("SessionAPI", [
  "$http",
  function($http) {
    var cart = {};
    var currentUser = null;

    this.login = function(user, success, error) {
      $http
        .post("/api/users/login", user)
        .then(function(data) {
          currentUser = data;
          success ? success(user) : null;
        })
        .catch(error || function() {});
    };

    this.register = function(user, success, error) {
      $http
        .post("/api/users/register", user)
        .then(function(data) {
          currentUser = data;
          success ? success(user) : null;
        })
        .catch(error || function() {});
    };

    this.getCurrentUser = function() {
      return currentUser;
    };

    this.addToCat = function(album) {
      var albumInCart = this.getCart()[album.id];
      if (albumInCart) {
        albumInCart.quantity++;
      } else {
        var newAlbum = angular.clone(album);
        newAlbum.quantity = 1;
        cart[album.id] = album;
      }
    };

    this.setQuantity = function(album, qtd) {
      var albumInCart = this.getCart()[album.id];
      if (albumInCart) {
        albumInCart.quantity = qtd;
      } else {
        var newAlbum = angular.clone(album);
        newAlbum.quantity = qtd;
        cart[album.id] = newAlbum;
      }
    };

    this.getCart = function() {
      if (currentUser && currentUser.cart) {
        return currentUser.cart;
      }
      return cart;
    };
  }
]);
