const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({msg:"Welcome to our library"});
});

module.exports = router;
