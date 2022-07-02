import { MongoClient } from "mongodb";
import { MONGO_KEY } from "../../key";

async function handler(req, res) {
  const client = await MongoClient.connect(MONGO_KEY);
  const db = client.db();
  if (req.method === "POST") {
    const meetupsCollection = db.collection("meetupCol");

    try {
      const result = await meetupsCollection.insertOne(req.body);

      console.log(result);
    } catch (error) {}

    client.close();

    res.status(201).json({ message: "Successful" });
  }
}

export default handler;
