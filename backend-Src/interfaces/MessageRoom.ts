import { ObjectId } from "mongodb";

export interface MessageRoom {
  senderId?: ObjectId;
  textMessage: string;
  RoomId: ObjectId;
  date: Date;
}
