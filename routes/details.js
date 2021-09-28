const { application } = require("express");
const express = require("express");
const router = express.Router();
const db = require("../database");

router.get("/:id", (req, res) => {
  const userId = req.session.userId;
  const { id } = req.params;
  db.oneOrNone(
    "SELECT movie_id, users_id, rating FROM movies WHERE movies.users_id = $1 AND movie_id = $2;",
    [req.session.userId, req.params.id]
  )
    .then((rating) => {
      console.log(rating);
      if (rating) {
        return res.render("./pages/details", {
          message: `you already give rating ${rating.rating} to this movie  `,
          id,
          userId,
        });
      } else {
        res.render("./pages/details", {
          id,
          userId,
        });
      }
    })
    .catch((error) => {
      console.log(error);
      res.send(error);
    });
});

// for gretting rating value

router.post("/:id", (req, res) => {
  console.log(req.body.rating);
  console.log(req.session.userId);
  console.log(req.params.id);
  db.none(
    "INSERT INTO movies (movie_id, users_id, rating) VALUES ($1, $2, $3);",
    [req.params.id, req.session.userId, req.body.rating]
  )
    .then(() => {
      // console.log(rating);
      console.log(req.session.userId);
      res.redirect("/:id");
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
});
  
module.exports = router;
