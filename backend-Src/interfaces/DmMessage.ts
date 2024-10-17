import { ObjectId } from "mongodb";

export interface DmMessage {
  textMessage: string;
  reciverId: ObjectId;
  senderId: ObjectId;
  date: Date;
}
