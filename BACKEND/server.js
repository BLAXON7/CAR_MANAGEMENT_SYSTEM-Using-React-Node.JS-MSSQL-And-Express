const express = require('express');
const cors = require('cors')
const app =  express();
const PORT = 5000;
const userroutes = require('./Routes/CarRoutes');

app.use(express.json()); 
app.use(cors());
app.use('/api', userroutes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
  });

app.get('/',(req,res)=>{
    res.send(`Hello From Node.js!! Backend!!`)
});
app.listen(PORT,()=>{
    console.log(`Server is runnning on http://localhost:${PORT}`)
});