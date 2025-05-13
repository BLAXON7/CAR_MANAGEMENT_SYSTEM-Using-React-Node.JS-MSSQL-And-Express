
//make route of marketplace
const express = require('express');
const MarketplaceRouter = express.Router();
const { getUniqueCarsOnSale, purchaseCar, getUniqueCarsOnRent } = require('../Controller/MarketPlaceController');



MarketplaceRouter.get('/unique-cars-on-sale', getUniqueCarsOnSale);
MarketplaceRouter.post("/purchase-car",purchaseCar);
MarketplaceRouter.get('/unique-cars-on-rent', getUniqueCarsOnRent);
module.exports = MarketplaceRouter;




