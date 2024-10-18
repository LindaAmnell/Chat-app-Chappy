import { MongoClient, Db, Collection } from "mongodb";
import { Dm } from "../../interfaces/Dm.js";

const con: string | undefined = process.env.CONNECTION_STRING;

export async function dmConnect(): Promise<[Collection<Dm>, MongoClient]> {
  if (!con) {
    console.log("No connection string, check your .env file!");
    throw new Error("No connection string");
  }

  const client: MongoClient = await MongoClient.connect(con);
  const db: Db = await client.db("Chappy");
  const col: Collection<Dm> = db.collection<Dm>("DmMessage");
  return [col, client];
}
