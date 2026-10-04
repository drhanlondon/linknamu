import { getClicksCollection } from "@/lib/mongodb";

export type ClickCounts = Record<string, number>;

export async function getClickCounts(): Promise<ClickCounts> {
  try {
    const collection = await getClicksCollection();
    if (!collection) return {};
    const docs = await collection.find().toArray();
    return Object.fromEntries(docs.map((doc) => [doc._id, doc.count]));
  } catch (error) {
    console.error("클릭 수 조회 실패:", error);
    return {};
  }
}

export async function incrementClick(linkId: string): Promise<boolean> {
  const collection = await getClicksCollection();
  if (!collection) return false;
  await collection.updateOne({ _id: linkId }, { $inc: { count: 1 } }, { upsert: true });
  return true;
}
