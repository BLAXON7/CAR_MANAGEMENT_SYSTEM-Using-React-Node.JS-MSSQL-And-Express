// make route of my purchases
const express = require('express');
const MyPurchasesRouter = express.Router();
const { getMyPurchases } = require('../Controller/MyPurchasesController');


MyPurchasesRouter.get('/my-purchases', getMyPurchases);

module.exports = MyPurchasesRouter;
