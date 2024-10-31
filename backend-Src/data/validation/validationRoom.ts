import Joi from "joi";
import { Room } from "../../interfaces/Room.js";

export const roomSchema = Joi.defaults((schema) => {
  return schema.required();
}).object({
  name: Joi.string().min(1).required(),
  image: Joi.string().min(1).required(),
  status: Joi.boolean().required(),
});

export function isValidRoom(room: Room): boolean {
  let result = roomSchema.validate(room);
  return !result.error;
}
