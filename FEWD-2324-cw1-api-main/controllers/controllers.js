const itineraryDAO = require("../models/itinerariesModel");
const itinerary = new itineraryDAO({
  filename: "itineraries.db",
  autoload: true,
});
const utils = require("../lib/utils");
const db = require("../config/users");
const hostelDAO = require("../models/hostelModel");
const hostel = new hostelDAO({ filename: "hostels.db", autoload: true });
const hostelDAO2 = require("../models/hostelModel");
const cafeHostel = new hostelDAO2({
  filename: "cafeHostel.db",
  autoload: true,
});

const reviewDAO = require("../models/reviewsModel");
const review = new reviewDAO({
  filename: "review.db",
  autoload: true,
});

exports.newList = function (req, res) {
  hostel.init();
  res.redirect("/");
};

exports.listCafeHostel = function (req, res) {
  cafeHostel
    .getAllEntries()
    .then((list) => {
      res.json(list);
      console.log(list);
    })
    .catch((err) => {
      console.log("promise rejected", err);
    });
};

exports.listHostel = function (req, res) {
  hostel
    .getAllEntries()
    .then((list) => {
      res.json(list);
      console.log(list);
    })
    .catch((err) => {
      console.log("promise rejected", err);
    });
};

exports.listIT = function (req, res) {
  itinerary
    .getAllEntries()
    .then((list) => {
      res.json(list);
      console.log(list);
    })
    .catch((err) => {
      console.log("promise rejected", err);
    });
};

exports.listReviews = function (req, res) {
  review
    .getAllEntries()
    .then((list) => {
      res.json(list);
      console.log(list);
    })
    .catch((err) => {
      console.log("promise rejected", err);
    });
};

exports.addItinerary = function (req, res) {
  console.log("req body to add to database : ", req.body);
  itinerary.addEntry(req.body).catch((err) => {
    console.log("promise rejected", err);
  });
  res.redirect("/");
};

exports.addReview = function (req, res) {
  console.log("req body to add to database : ", req.body);
  review.addEntry(req.body).catch((err) => {
    console.log("promise rejected", err);
  });
  res.redirect("/");
};

exports.processLogin = function (req, res, next) {
  db.findOne({ username: req.body.username }, { _id: 1 }, function (err, user) {
    if (!user) {
      res.status(401).json({ success: false, msg: "could not find user" });
    }
    console.log(user);
    // Function defined at bottom of app.js
    if (user) {
      const isValid = utils.validPassword(
        req.body.password,
        user.hash,
        user.salt
      );
      if (isValid) {
        const tokenObject = utils.issueJWT(user);
        res.status(200).json({
          success: true,
          token: tokenObject.token,
          expiresIn: tokenObject.expires,
          username: user.username,
        });
      } else {
        res
          .status(401)
          .json({ success: false, msg: "you entered the wrong password" });
      }
    }
  });
};

exports.processNewUser = function (req, res, next) {
  const saltHash = utils.genPassword(req.body.password);

  const salt = saltHash.salt;
  const hash = saltHash.hash;

  const newUser = {
    username: req.body.username,
    hash: hash,
    salt: salt,
  };

  console.log(newUser);

  db.insert(newUser, function (err, user) {
    res.json({ success: true, user: user });
  });
};

exports.displayAppData = function (req, res, next) {
  itinerary
    .getAllEntries()
    .then((list) => {
      let listItineraries = "";
      list.forEach(currentItineraries);

      function currentItineraries(item, index) {
        let hostelItinerary = item.itinerary
          .slice(2, item.itinerary.length)
          .toString();
        console.log(hostelItinerary);
        let nextItinerary = index;
        1 + ": Night: " + item.order[1] + " Itinerary: " + foodOrder + "<br >";
        console.log(nextItinerary);
        listItineraries = listItineraries + nextItinerary;
      }
      console.log(listItineraries);

      res.status(200).json({
        success: true,
        msg: listItineraries,
      });

      //console.log(list);
    })
    .catch((err) => {
      console.log("promise rejected", err);
    });
};
