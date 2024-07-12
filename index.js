const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000;
// middleware
const corsOptions = {
  origin:
  // [
  //   'https://shopsy-22222.web.app',"https://shopsy-22222.firebaseapp.com/"],
  ['http://localhost:5173', 'http://localhost:5174'],
  credentials: true,
  optionSuccessStatus: 200
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
    const productsCollection = client.db('Shopsy').collection('products');



    app.get('/products', async (req, res) => {
      const result = await productsCollection.find().toArray();
      res.send(result)
    })
    app.get('/product/:id', async (req, res) => {
      const id = req.params.id;
      const mainProduct = await productsCollection.findOne({ _id: new ObjectId(id) });
       // Fetch related products based on the relationships defined in your database
    const relatedProducts = await productsCollection.find({ category: mainProduct.category }).toArray();

    res.json({ mainProduct, relatedProducts });
      
    })
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('Hello Shopsy')
})
app.listen(port, () => {
  console.log(`Shopsy is running on port ${port}`);
})