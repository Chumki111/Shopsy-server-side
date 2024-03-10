const express= require('express');
const app= express();
require('dotenv').config();
const cors= require('cors');
const jwt =require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const { MongoClient, ServerApiVersion } = require('mongodb');
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





// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(process.env.DB_URL, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/',(req,res)=>{
    res.send('hello shopsy')
})
app.listen(port,()=>{
    console.log(`Shopsy is running on port ${port}`);
})