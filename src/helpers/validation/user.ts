import Joi from "joi";

const name = Joi.string().min(4).max(40).message("Name must be between 4 and 40 characters").lowercase().trim().required();
const email = Joi.string()
  .email({ tlds: { allow: ["com", "bg", "net"] } })
  .message("Email must be at least 8 characters and should end with .com, .bg or .net")
  .lowercase()
  .trim()
  .required();
const password = Joi.string().min(8).max(72).message("Password must be at least 8 charecters").required();

export const createUserValidationSchema = Joi.object({
  name,
  email,
  password,
});

export const userLoginValidationSchema = Joi.object({
  name,
  email,
  password,
});
