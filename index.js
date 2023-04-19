import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { MongoClient, ServerApiVersion } from 'mongodb';
const app = express()
const port = 4000

app.use(cors())
app.use(express.json())
dotenv.config()

const uri = process.env.STRING_URI;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

app.get('/', async (_, res) => {
  try {
    await client.connect()
      .then(() => console.log("Connected to database"))
      .catch(error => console.error(error))
    await client
      .db("blog")
      .collection("post")
      .find({})
      .toArray()
      .then(result => { res.status(200).send(result) })
      .catch(error => console.error(error))
  } finally {
    await client.close();
  }
})

app.post('/insert', async (req, res) => {
  try {
    await client.connect()
      .then(() => console.log("Connected to database"))
      .catch(error => console.error(error))
    await client
      .db("blog")
      .collection("post")
      .insertOne(req.body)
      .then(result => { res.status(200).send(result) })
      .catch(error => console.error(error))
  } finally {
    await client.close();
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})