const express= require('express');
const app= express();
require('dotenv').config();
const cors= require('cors');
const jwt =require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const port= process.env.PORT || 5000;
// middleware
const corsOptions={
    origin:['http://localhost:5173','http://localhost:5174'],
    credentials:true,
    optionSuccessStatus:200
}
app.use(cors(corsOptions))
app.use(express.json());
app.use(cookieParser())

app.get('/',(req,res)=>{
    res.send('hello shopsy')
})
app.listen(port,()=>{
    console.log(`Shopsy is running on port ${port}`);
})