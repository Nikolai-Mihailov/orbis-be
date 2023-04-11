import { ObjectSchema } from "joi";

const validate = async (schema: ObjectSchema<any>, payload: any) => {
  try {
    await schema.validateAsync(payload, { abortEarly: false });
  } catch (error) {
    if (error instanceof Error) return new Error(error.message);
    return new Error(`${error}`);
  }
};

export default validate;
