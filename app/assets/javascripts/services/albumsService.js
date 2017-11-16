angular.module("app").factory("AlbumsAPI", function() {
  var albums = [];
  var sections = ["Deals of the Day", "Populars", "New Releases"];
  var buySections = [
    "People who bought this album also bought",
    "Our suggestions for you"
  ];
  var sidebarSections = ["Best Sellers", "Our Favorites"];
  var albumsDetails = [
    { title: "College", artist: "The Chainsmokers" },
    { title: "Illuminati", artist: "Shawn Mendes" },
    { title: "Purpose", artist: "Justin Bieber" },
    { title: "X", artist: "Ed Sheeran" },
    { title: "Dangerous Woman", artist: "Ariana Grande" },
    { title: "25", artist: "Adele" },
    { title: "Cry Baby", artist: "Melanie Martinez" },
    { title: "Encore", artist: "DJ Snake" },
    { title: "Born To Die", artist: "Lana Del Rey" },
    { title: "LEMONADE", artist: "Beyonce" },
    { title: "Joanne", artist: "Lady Gaga" },
    { title: "21", artist: "Adele" },
    { title: "ANTi", artist: "Rihanna" },
    { title: "Views", artist: "Drake" },
    { title: "24K Magic", artist: "Bruno Mars" },
    { title: "Handwritten", artist: "Shawn Mendes" },
    { title: "us", artist: "Gnash" },
    { title: "1989", artist: "Taylor Swift" },
    { title: "Cross Road", artist: "Bon Jovi" },
    { title: "Unapologetic", artist: "Rihanna" },
    { title: "V", artist: "Maroon 5" },
    { title: "Blue Album", artist: "Lukas Graham" },
    { title: "+", artist: "Ed Sheeran" },
    { title: "Badlands", artist: "Halsey" },
    { title: "Thank You", artist: "Meghan Trainor" },
    { title: "Acoustic", artist: "Coldplay" },
    { title: "Sheezus", artist: "Lily Allen" },
    { title: "Confident", artist: "Demi Lovato" },
    { title: "Lady Wood", artist: "Tove Lo" },
    { title: "Ten", artist: "Pearl Jam" },
    { title: "Metallica", artist: "Metallica" },
    { title: "Glory", artist: "Britney Spears" },
    { title: "Uprising", artist: "Bob Marley" },
    { title: "Mylo Xyloto", artist: "Coldplay" },
    { title: "Title", artist: "Meghan Trainor" },
    { title: "SWAAY", artist: "DNCE" },
    { title: "Here", artist: "Alicia Keys" },
    { title: "Delirium", artist: "Ellie Goulding" },
    { title: "Viva La Vida", artist: "Coldplay" }
  ];

  var getImageName = function(name) {
    var res = name.toLowerCase();
    res = res.replace(/\s/g, "_").replace("/", ":");
    if (res === "purpose") {
      res += "_square";
    }

    return res;
  };

  for (var i = 0; i < albumsDetails.length; i++) {
    albums.push({
      id: i + 1,
      title: albumsDetails[i].title,
      artist: albumsDetails[i].artist,
      price: 9.9,
      imageUrl: "/images/" + getImageName(albumsDetails[i].title) + ".jpg",
      detailsHeader: "Free-Shipping world wide",
      details:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error impedit eos illum deserunt, quia eligendi eius, nostrum deleniti nobis consequuntur ex quam esse, omnis non sit dolor ad, harum vel."
    });
  }

  var _findAll = function() {
    return albums;
  };

  var _findById = function(id) {
    for (var i = 0; i < albums.length; i++) {
      if (albums[i].id == id) {
        return albums[i];
      }
    }
  };

  var getRandomInt = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  var _getBestSellers = function() {
    var res = [];
    var nums = [];
    for (var i = 0; res.length !== 5; i++) {
      var n = getRandomInt(0, 39);
      if (nums.indexOf(n) === -1) {
        nums.push(n);
        res.push(albums[n]);
      }
    }

    return res;
  };

  var _findAlbumSongsById = function(id) {
    return [
      { title: "Cras justo odio", time: 194 },
      { title: "Dapibus ac facilisis in", time: 194 },
      { title: "Morbi leo risus", time: 194 },
      { title: "Porta ac consectetur ac", time: 194 },
      { title: "Vestibulum at eros", time: 194 },
      { title: "Cras justo odio", time: 194 },
      { title: "Dapibus ac facilisis in", time: 194 },
      { title: "Morbi leo risus", time: 194 },
      { title: "Porta ac consectetur ac", time: 194 },
      { title: "Vestibulum at eros", time: 194 }
    ];
  };

  var _sectionsCase = function(type) {
    if (type === "home") {
      return sections;
    }

    if (type === "sidebar") {
      return sidebarSections;
    }

    if (type === "buy") {
      return buySections;
    }
  };

  var _getFive = function(arr) {
    var res = [];
    for (var i = 0; i < arr.length; i++) {
      res.push({
        title: arr[i],
        albums: _getBestSellers()
      });
    }

    return res;
  };

  var _getSidebarSections = function() {
    return _getFive(_sectionsCase("sidebar"));
  };

  var _getSections = function() {
    return _getFive(_sectionsCase("home"));
  };

  var _getRelatedSections = function() {
    return _getFive(_sectionsCase("buy"));
  };

  return {
    findAll: _findAll,
    findById: _findById,
    getBestSellers: _getBestSellers,
    getFavorites: _getBestSellers,
    getSuggestions: _getBestSellers,
    getBought: _getBestSellers,
    getSections: _getSections,
    getSidebarSections: _getSidebarSections,
    getRelatedSections: _getRelatedSections,
    findAlbumSongsById: _findAlbumSongsById
  };
});
