import Joi from "joi";
import { TransactionType, SortOrder } from "../interfaces/transaction.interface";

const amount = Joi.number().positive().message("Amount must be a positive number").required();
const type = Joi.string()
  .valid(TransactionType.Credit, TransactionType.Debit)
  .messages({
    "any.only": "Transaction type must be of type Credit or Debit",
  })
  .required();
const transactionId = Joi.number().positive().message("transactionId is missing or it's not a positive number").required();
const currentPage = Joi.number().positive().message("currentPage is missing or it's not positive number").required();
const itemsPerPage = Joi.number().positive().message("itemsPerPage is missing or it's not positive number").required();
const sortOrder = Joi.string().valid(SortOrder.ASC, SortOrder.DESC).messages({ "any.only": "itemsPerPage is missing or it's not positive number" }).required();

export const transactionValidationSchema = Joi.object({
  amount,
  type,
});

export const deleteTransactionValidationSchema = Joi.object({
  transactionId,
});

export const getAllTransactionsValidationSchema = Joi.object({
  currentPage,
  itemsPerPage,
  sortOrder,
});
