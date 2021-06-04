const router = require('express').Router();
const api = require('./controller');
const auth = require('../../common/authentication');

// Test API
router.get('/testApi', auth.decryptRequest, api.testingAPI);// Done



module.exports = router;
