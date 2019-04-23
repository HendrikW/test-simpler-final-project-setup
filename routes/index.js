const express = require('express');
const router  = express.Router();

/* GET home page */
router.get('/test', (req, res, next) => {
  res.json({ message: 'my (hendrik\'s) test.' });
});

module.exports = router;
