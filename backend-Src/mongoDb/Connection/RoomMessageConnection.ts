import { MongoClient, Db, Collection } from "mongodb";
import { MessageRoom } from "../../interfaces/MessageRoom.js";

const con: string | undefined = process.env.CONNECTION_STRING;

export async function roomMessageConnect(): Promise<
  [Collection<MessageRoom>, MongoClient]
> {
  if (!con) {
    console.log("No connection string, check your .env file!");
    throw new Error("No connection string");
  }

  const client: MongoClient = await MongoClient.connect(con);
  const db: Db = await client.db("Chappy");
  const col: Collection<MessageRoom> =
    db.collection<MessageRoom>("MessageRoom");
  return [col, client];
}
