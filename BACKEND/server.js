const express = require('express');
const cors = require('cors')
const app =  express();
const PORT = 5000;
const userroutes = require('./Routes/CarRoutes');
const MarketplaceRouter = require('./Routes/MarketPlaceRoute');
const MyPurchasesRouter = require('./Routes/MyPurchasesRoute');
const MyRentalsRouter = require('./Routes/MyRentalsRoute');
const TransactionsRouter = require('./Routes/TransactionsRoute');
app.use(express.json()); 
app.use(cors());
app.use('/api', userroutes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
  });

// // // // // Edited Portion Start // // // // //

// Marketplace Route
app.use('/api/marketplace', MarketplaceRouter);

// My Purchases Route
app.use('/api/my-purchases', MyPurchasesRouter);

// My Rentals Route
app.use('/api/my-rentals', MyRentalsRouter);

// Transactions Route
app.use('/api/transactions', TransactionsRouter);

// // // // // Edited Portion End // // // // //


app.get('/',(req,res)=>{
    res.send(`Hello From Node.js!! Backend!!`)
});
app.listen(PORT,()=>{
    console.log(`Server is runnning on http://localhost:${PORT}`)
});