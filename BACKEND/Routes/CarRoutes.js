const express = require('express');
const router = express.Router();
const Controller = require('../Controller/CarController');


router.get('/Users',Controller.getusers);
router.get('/Salecars',Controller.SaleCars);
router.get('/Rentcars',Controller.RentCars);
router.get('/TopRatedCars',Controller.TopRatedCars);
router.get('/RentalHistory',Controller.RentalHistory);

module.exports = router;

