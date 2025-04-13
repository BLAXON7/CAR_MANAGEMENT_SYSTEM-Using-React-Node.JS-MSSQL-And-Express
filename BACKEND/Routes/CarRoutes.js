const express = require('express');
const router = express.Router();
const userController = require('../Controller/CarController');


router.get('/Users',userController.getusers);

module.exports = router;