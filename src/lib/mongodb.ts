import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

// 연결을 전역에 캐시해서 요청(또는 개발 모드 핫 리로드)마다 새 연결이 생기지 않게 한다
const globalForMongo = globalThis as { _mongoClientPromise?: Promise<MongoClient> };

function connect(): Promise<MongoClient> {
  const promise = new MongoClient(uri!).connect();
  // 연결에 실패하면 캐시를 비워서 다음 요청 때 다시 연결을 시도한다
  promise.catch(() => {
    if (globalForMongo._mongoClientPromise === promise) globalForMongo._mongoClientPromise = undefined;
  });
  return promise;
}

export async function getClicksCollection() {
  if (!uri) return null;
  globalForMongo._mongoClientPromise ??= connect();
  const client = await globalForMongo._mongoClientPromise;
  const dbName = process.env.MONGODB_DB ?? "linknamu";
  return client.db(dbName).collection<{ _id: string; count: number }>("clicks");
}
