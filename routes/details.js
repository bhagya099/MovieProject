const { application } = require("express");
const express = require("express");
const router = express.Router();
const db = require("../database");

router.get("/:id", (req, res) => {
  const userId = req.session.userId;
  const { id } = req.params;
  res.render("./pages/details", { id, userId });
});

// for gretting rating value

router.post("/rate", (req, res) => {
  console.log(req.body.rating);
  db.oneOrNone(
    "SELECT users_id, rating FROM movies WHERE user_id = $1, rating = $2;",
    [req.session.userId, req.params.rating]
  )
    .then((rating) => {
      console.log(rating);
      console.log(req.session.userId);
      if (rating) {
        res.redirect(
          "/:id?message=You%20already%give%20rating%20to%20this%20movie"
        );
      } else {
        db.none("INSERT INTO movies (users_id, rating) VALUES ($1, $2);", [
          req.session.userId,
          req.params.rating,
        ])
          .then(() => {
            console.log(rating);
            console.log(req.session.userId);
            res.redirect("/:id");
          })
          .catch((err) => {
            console.log(err);
          });
      }
    })
    .catch((err) => {});
});
module.exports = router;
