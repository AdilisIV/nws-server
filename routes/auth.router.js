const express = require('express');
const auth = require('../controllers/auth.controller');

const router = express.Router();


router.get('/facebook', auth.authFacebook);
router.get('/facebook/callback', auth.facebookCallback);

module.exports = router;