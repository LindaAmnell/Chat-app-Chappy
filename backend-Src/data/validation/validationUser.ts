import Joi from "joi";
import { User } from "../../interfaces/User.js";

export const userSchema = Joi.defaults((schema) => {
  return schema.required();
}).object({
  name: Joi.string().min(1).trim().required(),
  password: Joi.string().min(5).required(),
  image: Joi.string().min(1).required(),
});

export function isValidUser(user: User): boolean {
  let result = userSchema.validate(user);
  return !result.error;
}
