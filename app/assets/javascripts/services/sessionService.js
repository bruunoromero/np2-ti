angular.module("app").service("SessionAPI", [
  "$http",
  function($http) {
    var cart = {};
    var currentUser = null;

    var getImageName = function(name) {
      var res = name.toLowerCase();
      res = res.replace(/\s/g, "_").replace("/", ":");
      if (res === "purpose") {
        res += "_square";
      }

      return "/images/" + res + ".jpg";
    };

    var normalizeCart = function(items) {
      c = {};
      angular.forEach(items, function(item) {
        var album = item.album;
        album.quantity = item.quantity;
        album.imageUrl = getImageName(album.title);
        c[album.id] = album;
      });
      return c;
    };

    var session = function(url, data, success, error) {
      $http
        .post("/api/users/" + url, data)
        .then(function(res) {
          currentUser = res.data;
          currentUser.cart = normalizeCart(res.data.open_order.order_items);
          success ? success(currentUser) : null;
        })
        .catch(
          error ||
            function(err) {
              console.log(err);
            }
        );
    };

    this.login = function(user, success, error) {
      session(
        "login",
        {
          email: user.email,
          password: user.password,
          cart: Object.values(cart)
        },
        success,
        error
      );
    };

    this.register = function(user, success, error) {
      session(
        "register",
        {
          email: user.email,
          password: user.password,
          cart: Object.values(cart),
          passwordAgain: user.passwordAgain
        },
        success,
        error
      );
    };

    this.getCurrentUser = function() {
      return currentUser;
    };

    this.addToCart = function(album) {
      var albumInCart = this.getCart()[album.id];
      var success = function() {
        if (albumInCart) {
          albumInCart.quantity++;
        } else {
          var newAlbum = angular.copy(album);
          newAlbum.quantity = 1;
          cart[album.id] = newAlbum;
        }
      };

      if (currentUser && currentUser.email) {
        $http
          .post("/api/users/add_to_cart", {
            album_id: album.id,
            email: currentUser.email,
            password: currentUser.password
          })
          .then(function() {
            success();
          })
          .catch(function() {
            console.log("error");
          });
      } else {
        success();
      }
    };

    this.setQuantity = function(album, qtd) {
      var albumInCart = this.getCart()[album.id];
      if (albumInCart) {
        albumInCart.quantity = qtd;
      } else {
        var newAlbum = angular.copy(album);
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
