import { MongoClient, Db, Collection } from "mongodb";
import { DmMessage } from "../../interfaces/DmMessage.js";

const con: string | undefined = process.env.CONNECTION_STRING;

export async function dmConnect(): Promise<
  [Collection<DmMessage>, MongoClient]
> {
  if (!con) {
    console.log("No connection string, check your .env file!");
    throw new Error("No connection string");
  }

  const client: MongoClient = await MongoClient.connect(con);
  const db: Db = await client.db("Chappy");
  const col: Collection<DmMessage> = db.collection<DmMessage>("DmMessage");
  return [col, client];
}
