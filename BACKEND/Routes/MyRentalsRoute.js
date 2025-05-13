// make route of my rentals
const express = require('express');
const MyRentalsRouter = express.Router();
const { getMyRentals } = require('../Controller/MyRentalsController');


MyRentalsRouter.get('/my-rentals', getMyRentals);

module.exports = MyRentalsRouter;
