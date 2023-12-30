const express = require("express");
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 5000;

app.use(
    cors({
      origin: ["http://localhost:5173"]
    })
  );
  app.use(express.json());

const uri = process.env.SECRET_URI;


const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  const projectsCollection = client.db(process.env.CLIENT_DB).collection("projects");
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    // console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }

  // get single projects
  app.get("/projects/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const result = await projectsCollection.findOne(filter);
      res.send(result);
    } catch (error) {
      res.send(error);
    }
  });

  // get projects

  app.get("/projects", async (req, res) => {
    try {
      const query = projectsCollection.find();
      const result = await query.toArray();
      res.send(result);
    } catch (error) {
      res.send(error);
    }
  });

}
run().catch(console.dir);



app.get("/", async (req, res) => {
    res.send("Necleo is running...");
  });
  app.listen(port, () => {
    console.log(`Necleo app running is port ${port}`);
  });
