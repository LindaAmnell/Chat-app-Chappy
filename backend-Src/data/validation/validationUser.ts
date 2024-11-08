import Joi from "joi";
import { User } from "../../interfaces/User.js";

export const userSchema = Joi.defaults((schema) => {
  return schema.required();
}).object({
  name: Joi.string().min(4).max(14).trim().required(),
  password: Joi.string().min(8).required(),
  image: Joi.string().min(10).required(),
});

export function isValidUser(user: User): boolean {
  let result = userSchema.validate(user);
  return !result.error;
}

export const changeUserSchema = Joi.defaults((schema) => {
  return schema.required();
})
  .object({
    name: Joi.string().min(4).optional(),
    password: Joi.string().min(8).optional(),
    image: Joi.string().min(10).optional(),
  })
  .required()
  .min(1);
export function isValidChangeUser(user: User): boolean {
  let result = changeUserSchema.validate(user);
  return !result.error;
}
