const googleOAuthHandler = require('./googleOAuthHandler');

const router = require('express').Router();

router.get('/', async (req, res) => {
  const response = await googleOAuthHandler(req);
  res.send(response);
});

module.exports = router;
