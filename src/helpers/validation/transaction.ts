import Joi from "joi";
import { TransactionType } from "../interfaces/transaction.interface";

const amount = Joi.number().positive().message("Amount must be a positive number").required();
const type = Joi.string()
  .valid(TransactionType.Credit, TransactionType.Debit)
  .messages({
    "any.only": "Transaction type must be of type Credit or Debit",
  })
  .required();

export const transactionValidationSchema = Joi.object({
  amount,
  type,
});
