const express = require('express');
const router = express.Router();

router.get("/:id", (req, res) => {
  const userId = req.session.userId;
  const { id } = req.params;
  res.render("./pages/details", { id });
});

module.exports = router;
