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
        album.orderId = item.id;
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
      var self = this;
      var albumInCart = this.getCart()[album.id];
      var success = function() {
        if (albumInCart) {
          albumInCart.quantity++;
        } else {
          var newAlbum = angular.copy(album);
          newAlbum.quantity = 1;
          self.getCart()[album.id] = newAlbum;
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

    this.setQuantity = function(album) {
      var self = this;
      var albumInCart = this.getCart()[album.id];
      var success = function() {
        if (albumInCart) {
          albumInCart.quantity = album.quantity;
        } else {
          var newAlbum = angular.copy(album);
          newAlbum.quantity = album.quantity;
          self.getCart()[album.id] = newAlbum;
        }
      };

      if (currentUser && currentUser.email) {
        $http
          .put("/api/users/set_product_quantity", {
            order_id: album.orderId,
            email: currentUser.email,
            quantity: album.quantity,
            password: currentUser.password
          })
          .then(function() {
            success();
          })
          .catch(function(err) {
            console.log(err);
          });
      } else {
        success();
      }
    };

    this.remove = function(album) {
      var self = this;
      var success = function() {
        delete self.getCart()[album.id];
      };

      if (currentUser && currentUser.email) {
        $http
          .post("/api/users/remove_product", {
            order_id: album.orderId,
            email: currentUser.email,
            password: currentUser.password
          })
          .then(function() {
            success();
          })
          .catch(function(err) {
            console.log(err);
          });
      } else {
        success();
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
