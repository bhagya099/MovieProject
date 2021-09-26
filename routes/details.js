const { application } = require("express");
const express = require("express");
const router = express.Router();
const db = require("../database");

router.get("/:id", (req, res) => {
  const userId = req.session.userId;
  const { id } = req.params;
  res.render("./pages/details", {
    id,
    userId,
  });
});

// for gretting rating value

router.post("/rate", (req, res) => {
  console.log(req.body.rating);
  console.log(req.session.userId);
  console.log(req.params.id);
  db.oneOrNone(
    "SELECT users_id, rating FROM movies WHERE movies.users_id = $1;",
    [req.session.userId]
  )
    .then((rating) => {
      console.log(rating);
      console.log(req.session.userId);
      if (rating) {
        res.redirect(
          "/:id?message=You%20already%give%20rating%20to%20this%20movie"
        );
      } else {
        db.none(
          "INSERT INTO movies (movie_id, users_id, rating) VALUES ($1, $2, $3);",
          [req.params.id, req.session.userId, req.params.rating]
        )
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
