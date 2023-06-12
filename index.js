const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

const uri =
   `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.vrk8jch.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
   serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
   },
});

async function run() {
   try {
      // Connect the client to the server	(optional starting in v4.7)
      await client.connect();

      const instructorCollection = client.db("skillUpDB").collection("instructor");
      const userCollection = client.db("userDB").collection("user");

      // insert a instructor
      app.post("/instructor", async (req, res) => {
         const newInstructor = req.body;
         console.log(newInstructor);
         const result = await instructorCollection.insertOne(newInstructor);
         res.send(result);
      });
      app.post("/user", async (req, res) => {
         const user = req.body;
         console.log(user);
         const result = await userCollection.insertOne(user);
         res.send(result);
      });

      // Send a ping to confirm a successful connection
      await client.db("admin").command({ ping: 1 });
      console.log(
         "Pinged your deployment. You successfully connected to MongoDB!"
      );
   } finally {
      // Ensures that the client will close when you finish/error
      // await client.close();
   }
}
run().catch(console.dir);

app.get('/', (req, res) => {
   res.send('Skill Up Camp is running...')
})

app.listen(port, () => {
   console.log(`Skill Up Camp is running on port ${port}`);
})
