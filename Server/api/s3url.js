const generateUploadURL = require('../s3');

const router = require('express').Router();

//get secure url from OUR server
router.get('/', async (req, res) => {
  const url = await generateUploadURL();
  res.send(url);
});

module.exports = router;
