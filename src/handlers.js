import { getClient } from "./MongoClient";

const COLLECTION = "posts";

export async function getPosts(_, res) {
  const { db, client } = await getClient();
  const result = await db.collection(COLLECTION).find().toArray();
  res.status(200).send(result);
  client.close();
}

export async function insertPost(req, res) {
  const { db, client } = await getClient();
  await db.collection(COLLECTION).insertOne(req.body);
  const records = await db.collection(COLLECTION).find().toArray();
  res.status(200).send(records);
  client.close();
}
