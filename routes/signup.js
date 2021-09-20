const express = require('express');
const router = express.Router();
const db = require('../database');
const bcrypt = require('bcrypt');

// req.flash("error", "Either this email doesn't exists or password is not correct");
// req.flash("success_msg", "You are now registered, please log in");

//  to get sign up page
router.get('/', (req, res) => {
  //   req.flash('message', 'req.query.message');
  res.render('pages/signup', {
    message: req.query.message,
  });
});

// for post method

router.post('/', (req, res) => {
  const { name, email, password, confirm_password } = req.body;
  console.log(req.body);
  // first check the user if exists
  db.oneOrNone('SELECT * FROM user WHERE email = $1;', email)
    .then((userExists) => {
      if (userExists) {
        res.redirect('/signup?message=Email%20already%20exists.');
      }
      // if new users then create
      else {
        //   convert the password to hash
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        //   changing the email intop lowecase and remove all the whitespace
        const cleanEmail = email.toLowerCase().trim();
        if (!name || !email || !password || !confirm_password) {
          return res.redirect(
            '/signup?message=Please%20fill%20the%all details'
          );
        } else {
          // check the password and confirm_password value should be same
          if (password !== confirm_password) {
            return res.redirect(
              '/signup?message=Passwrod%20should%20be%20match.'
            );
          } else {
            db.none(
              'INSERT INTO users (name, email, password) VALUES ($1, $2, $3);',
              [name, cleanEmail, hash]
            )
              .then(() => {
                res.redirect('/');
              })
              .catch((err) => {
                console.log(err);
                res.send(err);
              });
          }
        }
      }
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
});
module.exports = router;