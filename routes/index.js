var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");


// Root
router.get('/', function (req, res) {
   res.render("landing")
});

// Sign up 
router.get("/register", function (req, res) {
   res.render("register");
});


router.post("/register", function (req, res) {
   var newUser = new User({ username: req.body.username });
   User.register(newUser, req.body.password, function (err, user) {
      if (err) {
         return res.render("register", {"error": err.message});
      }
      passport.authenticate("local")(req, res, function () {
         req.flash("success", "Welcome" + user.username );
         res.redirect("/campgrounds");
      });
   });
});

// Log in
router.get("/login", function (req, res) {
   res.render("login", { message: req.flash("error") });
});


router.post("/login", passport.authenticate("local", {
   successRedirect: "/campgrounds",
   failureRedirect: "/login"
}), function (req, res) {
});


// Log out 
router.get("/logout", function (req, res) {
   req.logout();
   req.flash("success", "Logged you out!");
   res.redirect("/campgrounds");
});


module.exports = router;