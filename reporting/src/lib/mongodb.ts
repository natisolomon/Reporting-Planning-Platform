// src/lib/mongodb.ts
import { MongoClient, Db } from "mongodb";

if (!process.env.MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

const uri: string = process.env.MONGODB_URI;

// TLS options to avoid Windows Node TLS handshake issues
const options = {
  tls: true,
  tlsAllowInvalidCertificates: process.env.NODE_ENV === "development", // dev only
};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

declare global {
  // For hot-reloading in dev
  var _mongoClientPromise: Promise<MongoClient>;
}

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export async function getDB(): Promise<Db> {
  const client = await clientPromise;
  return client.db("evaSUE"); // replace with your DB name
}
