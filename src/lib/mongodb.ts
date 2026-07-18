import { MongoClient, Db, GridFSBucket } from "mongodb";

const uri = process.env.MONGODB_URI;
if (!uri) {
  throw new Error("MONGODB_URI environment variable is not set");
}

const options = {};

let clientPromise: Promise<MongoClient>;

// In development, use a global variable to preserve the client across HMR
if (process.env.NODE_ENV === "development") {
  const globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };
  if (!globalWithMongo._mongoClientPromise) {
    const client = new MongoClient(uri, options);
    globalWithMongo._mongoClientPromise = client.connect();
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  const client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export async function getDb(): Promise<Db> {
  const client = await clientPromise;
  return client.db();
}

export async function getGridFSBucket(): Promise<GridFSBucket> {
  const db = await getDb();
  return new GridFSBucket(db);
}

export default clientPromise;
