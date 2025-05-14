// make route of transactions
const express = require('express');
const TransactionsRouter = express.Router();
const { 
    insertTransactionWithOptionalRating,
    processRentalPayment,
    purchaseCar
} = require('../Controller/TransactionsController');

TransactionsRouter.post('/insert-transaction', insertTransactionWithOptionalRating);
TransactionsRouter.post('/process-rental-payment', processRentalPayment);
TransactionsRouter.post('/purchase-car', purchaseCar);

module.exports = TransactionsRouter;
