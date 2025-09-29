// src/lib/mongodb.ts
import { MongoClient, Db } from 'mongodb';

const options = {
  tls: true,
  tlsAllowInvalidCertificates: process.env.NODE_ENV === 'development',
};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

declare global {
  var _mongoClientPromise: Promise<MongoClient>;
}

export async function getDB(): Promise<Db> {
  // ✅ Check MONGODB_URI only when needed (at runtime)
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error(
      'MONGODB_URI is not defined. Please add it to your environment variables.'
    );
  }

  if (!clientPromise) {
    if (process.env.NODE_ENV === 'development') {
      // In development, use global to preserve client across hot reloads
      if (!global._mongoClientPromise) {
        const client = new MongoClient(uri, options);
        global._mongoClientPromise = client.connect();
      }
      clientPromise = global._mongoClientPromise;
    } else {
      // In production, create a new client
      const client = new MongoClient(uri, options);
      clientPromise = client.connect();
    }
  }

  const connectedClient = await clientPromise;
  return connectedClient.db('evaSUE');
}