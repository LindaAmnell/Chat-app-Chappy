import Joi from "joi";
import { Dm } from "../../interfaces/Dm.js";

export const DmMessageSchema = Joi.defaults((schema) => {
  return schema.required();
}).object({
  textMessage: Joi.string().min(1).required(),
  reciverId: Joi.string().length(24).hex(),
  senderId: Joi.string().length(24).hex(),
});

export function isValidDm(Dm: Dm): boolean {
  let result = DmMessageSchema.validate(Dm);
  return !result.error;
}
