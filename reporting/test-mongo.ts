import { MongoClient } from "mongodb";

const uri = "mongodb+srv://report:evasuereport@report.fgjrzyt.mongodb.net/evasue?retryWrites=true&w=majority";

async function testConnection() {
  try {
    const client = new MongoClient(uri);
    await client.connect();
    console.log("✅ MongoDB connected successfully!");
    const db = client.db("evasue");
    const users = await db.collection("users").find().toArray();
    console.log("Users in DB:", users);
    await client.close();
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err);
  }
}

testConnection();
