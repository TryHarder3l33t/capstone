const router = require('express').Router();

router.get('/', (req, res) => {
  res.send('good morning america how are you?');
});

module.exports = router;
