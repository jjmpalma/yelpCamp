// app middleware
var Campground = require("../models/campground");
var Comment = require("../models/comment");

var middlewareObject = {};

middlewareObject.checkCampOwnership = function (req, res, next) {
   if (req.isAuthenticated()) {
      Campground.findById(req.params.id, function (err, foundCampground) {
         if (err) {
            req.flash("err", "Campground not found");
            res.redirect("back");
         } else {
            if (foundCampground.author.id.equals(req.user._id)) {
               next();
            } else {
               req.flash("err", "Action not allowed");
               res.redirect("back");
            }
         }
      });
   } else {
      req.flash("err", "Please log in");
      res.redirect("back");
   }
}

middlewareObject.checkcommentOwnership = function (req, res, next) {
   if (req.isAuthenticated()) {
      Comment.findById(req.params.comment_id, function (err, foundComment) {
         if (err) {
            res.redirect("back");
         } else {
            if (foundComment.author.id.equals(req.user._id)) {
               next();
            } else {
               req.flash("err", "Action not allowed");
               res.redirect("back");
            }
         }
      });
   } else {
      req.flash("err", "Please log in");
      res.redirect("back");
   }
}

middlewareObject.isLoggedIn = function (req, res, next) {
   if (req.isAuthenticated()) {
      return next();
   } else {
      req.flash("error", "Please log in");
      res.redirect("/login");
   }
}

module.exports = middlewareObject;