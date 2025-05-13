// make route of transactions
const express = require('express');
const TransactionsRouter = express.Router();
const { insertTransactionWithOptionalRating } = require('../Controller/TransactionsController');


TransactionsRouter.post('/insert-transaction', insertTransactionWithOptionalRating);

module.exports = TransactionsRouter;
