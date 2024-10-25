import Joi from "joi";
import { MessageRoom } from "../../interfaces/MessageRoom.js";

export const RoomMessageSchema = Joi.defaults((schema) => {
  return schema.required();
}).object({
  textMessage: Joi.string().min(1).required(),
  roomName: Joi.string().required(),
  senderName: Joi.string().optional(),
  date: Joi.date().required(),
});

export function isValidRoomMessage(MessageRoom: MessageRoom): boolean {
  let result = RoomMessageSchema.validate(MessageRoom);
  return !result.error;
}
