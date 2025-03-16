const express = require('express');
const cors = require('cors')
const app =  express();
const PORT = 5000;

app.use (cors());

app.get('/',(req,res)=>{
    res.send(`Hello From Node.js!! Backend!!`)
});
app.listen(PORT,()=>{
    console.log(`Server is runnning on http://localhost:${PORT}`)
});