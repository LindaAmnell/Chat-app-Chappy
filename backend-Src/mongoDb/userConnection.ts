import { MongoClient, Db, Collection } from "mongodb";
import { User } from "../interfaces/User.js";

const con: string | undefined = process.env.CONNECTION_STRING;

export async function connect(): Promise<[Collection<User>, MongoClient]> {
  if (!con) {
    console.log("No connection string, check your .env file!");
    throw new Error("No connection string");
  }

  const client: MongoClient = await MongoClient.connect(con);
  const db: Db = await client.db("Chappy");
  const col: Collection<User> = db.collection<User>("User");
  return [col, client];
}
