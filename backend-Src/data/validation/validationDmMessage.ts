import Joi from "joi";
import { Dm } from "../../interfaces/Dm.js";

export const DmMessageSchema = Joi.defaults((schema) => {
  return schema.required();
}).object({
  textMessage: Joi.string().min(1).required(),
  receiverName: Joi.string().min(1).required(),
  senderName: Joi.string().min(1).required(),
  date: Joi.date().optional(),
});

export function isValidDm(Dm: Dm): boolean {
  let result = DmMessageSchema.validate(Dm);
  return !result.error;
}
