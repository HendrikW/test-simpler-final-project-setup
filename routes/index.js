const express = require('express');
const router  = express.Router();

/* GET test message */
router.get('/test', (req, res, next) => {
  setTimeout(() => {
    res.json({ message: 'my (hendrik\'s) test. this message comes from the backend.' });
  }, 1000)  
});

/* GET user information – we can name this /loggedInUser or whatever */
router.get('/user', (req, res, next) => {
  setTimeout(() => {
    res.json({ fullName: 'Mr. Test Test' });
  }, 1000)  
});

module.exports = router;
