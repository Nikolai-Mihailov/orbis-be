import { Request, Response, RequestHandler, NextFunction } from "express";
import validate from "../helpers/validation/joi-helper";
import { Transactions, GetAllTransactionsQuery, TransactionsResult } from "../helpers/interfaces/transaction.interface";
import { transactionValidationSchema, deleteTransactionValidationSchema, getAllTransactionsValidationSchema } from "../helpers/validation/transaction";
import { createTransactionService, deleteTransactionService, getAllTransactionsService } from "../services/transaction.service";

export const GetAllTrannsactionsController: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  const queryParams = req.query as unknown as GetAllTransactionsQuery;
  const currentPage: number = +queryParams.currentPage;
  const itemsPerPage: number = +queryParams.itemsPerPage;
  const validateSchema: Error | undefined = await validate(getAllTransactionsValidationSchema, { currentPage, itemsPerPage, sortOrder: queryParams.sortOrder });

  try {
    if (validateSchema instanceof Error) throw new Error(validateSchema.message);

    const result = (await getAllTransactionsService({ currentPage, itemsPerPage, sortOrder: queryParams.sortOrder })) as TransactionsResult | Error;

    if (result instanceof Error) {
      return res.status(401).send({
        message: "Fetch all transactions failed",
      });
    }
    return res.status(200).send({
      result,
      message: "success",
    });
  } catch (error) {
    next(error);
  }
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
