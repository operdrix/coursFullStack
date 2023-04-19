import dotenv from "dotenv";
import { MongoClient, ServerApiVersion } from 'mongodb';

dotenv.config();

const uri = process.env.STRING_URI;
const DATABASE = "blog";

const client = new MongoClient(uri, {
   serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
   }
});

export async function getClient() {
   await client.connect();
   return { db: client.db(DATABASE), client }
}
