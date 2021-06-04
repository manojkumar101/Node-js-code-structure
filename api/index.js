var express = require('express');
var router = express.Router();
 
router.use('/login', require('./loginAPIModule/routes'));

module.exports = router;