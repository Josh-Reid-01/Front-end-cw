const express = require("express");
const router = express.Router();
const controller = require("../controllers/controllers");
const passport = require("passport");

router.get("/", controller.listHostel);
router.get("/hostels", controller.listHostel);
router.get("/cafehostels", controller.listCafeHostel);
router.get("/new", controller.newList);
router.post("/addItinerary", controller.addItinerary);
router.post("/addReview", controller.addReview);

router.get(
  "/viewIT",
  //passport.authenticate("jwt", { session: false }),
  controller.listIT
);

router.get("/viewReviews", controller.listReviews);

router.get(
  "/appData",
  passport.authenticate("jwt", { session: false }),
  controller.displayAppData
);
router.post("/login", controller.processLogin);
router.post("/register", controller.processNewUser);

router.use(function (req, res) {
  res.status(404);
  res.type("text/plain");
  res.send("404 Not found.");
});

router.use(function (err, req, res, next) {
  res.status(500);
  res.type("text/plain");
  res.send("Internal Server Error.");
});

// Hostels API version 1.0

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

// ENDPOINTS

/* GET all details of all hostels */
// router.get("/hostels", function (req, res) {
//   hostels.length == 0 ? res.status(404) : res.status(200);
//   res.send(hostels);
// });

/* GET hostel by id */

module.exports = router;
