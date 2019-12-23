const express = require("express");
const router = express.Router();
const controller = require('../controllers/user');
const authController = require('../controllers/auth.controller');


router.use(authController.checkToken);
router.use(authController.findMatchUser);

router.get('/:id', controller.getUserBy);


module.exports = router;