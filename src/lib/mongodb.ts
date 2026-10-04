import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

// 개발 모드 핫 리로드 시 연결이 계속 늘어나지 않도록 전역에 캐시
const globalForMongo = globalThis as { _mongoClientPromise?: Promise<MongoClient> };

function getClientPromise(): Promise<MongoClient> | null {
  if (!uri) return null;
  if (process.env.NODE_ENV === "development") {
    globalForMongo._mongoClientPromise ??= new MongoClient(uri).connect();
    return globalForMongo._mongoClientPromise;
  }
  return new MongoClient(uri).connect();
}

let clientPromise: Promise<MongoClient> | null = null;

export async function getClicksCollection() {
  clientPromise ??= getClientPromise();
  if (!clientPromise) return null;
  const client = await clientPromise;
  const dbName = process.env.MONGODB_DB ?? "linknamu";
  return client.db(dbName).collection<{ _id: string; count: number }>("clicks");
}
