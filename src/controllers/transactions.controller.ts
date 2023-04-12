import { Request, Response, RequestHandler, NextFunction } from "express";
import validate from "../helpers/validation/joi-helper";
import { Transactions } from "../helpers/interfaces/transaction.interface";
import { transactionValidationSchema, deleteTransactionValidationSchema, getAllTransactionsValidationSchema } from "../helpers/validation/transaction";
import { createTransactionService, deleteTransactionService } from "../services/transaction.service";

export const GetAllTrannsactionsController: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  //  TO DO - to add types on req.query
  const { currentPage, itemsPerPage, SortOrder } = req.query;
  const validateSchema: Error | undefined = await validate(getAllTransactionsValidationSchema, { currentPage, itemsPerPage, SortOrder });

  try {
    if (validateSchema instanceof Error) throw new Error(validateSchema.message);
    
  } catch (error) {
    next(error);
  }

  return res.status(200).send({
    message: "GetTrannsactionsController",
  });
};

export const CreateTransactionController: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  const { amount, type }: Transactions = req.body;
  const validateSchema: Error | undefined = await validate(transactionValidationSchema, { amount, type });
  const accountId: number = req.currentUser.userId;

  try {
    if (validateSchema instanceof Error) throw new Error(validateSchema.message);

    const result = (await createTransactionService({ account_id: accountId, amount, type })) as Error | Transactions;

    if (result instanceof Error) {
      return res.status(401).json({
        message: "Create transaction failed.",
      });
    }

    return res.status(200).json("Your transaction was saved successfuly");
  } catch (error) {
    next(error);
  }
};

export const DeleteTransactionController: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  const transactionId: number = +req.params?.transactionId;
  const userId: number = +req.currentUser.userId;
  const validateSchema: Error | undefined = await validate(deleteTransactionValidationSchema, { transactionId });

  try {
    if (validateSchema instanceof Error) throw new Error(validateSchema.message);
    const result = (await deleteTransactionService({ transactionId, userId })) as Error | Transactions;

    if (result instanceof Error) {
      return res.status(401).json({
        message: "Delete transaction failed",
      });
    }
    return res.status(200).json("The transaction was deleted");
  } catch (error) {
    next(error);
  }
};
//  TO DO
export const UpdateTransactionController: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {};
