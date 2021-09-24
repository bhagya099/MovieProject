const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  const userId = req.session.userId;
  res.render('./pages/details', { userId });
});

module.exports = router;
