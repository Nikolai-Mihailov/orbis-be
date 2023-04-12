import { Request, Response, RequestHandler, NextFunction } from "express";
import validate from "../helpers/validation/joi-helper";
import { Transactions, DeleteTransaction } from "../helpers/interfaces/transaction.interface";
import { transactionValidationSchema } from "../helpers/validation/transaction";
import { createTransactionService, deleteTransactionService } from "../services/transaction.service";

export const GetTrannsactionsController: RequestHandler = async (req: Request, res: Response) => {
  res.status(200).send({
    message: "GetTrannsactionsController",
  });
};

export const CreateTransactionController: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  const { amount, type }: Transactions = req.body;
  const validateSchema: Error | undefined = await validate(transactionValidationSchema, { amount, type });
  const accountId: number = req.currentUser.userId;

  try {
    if (validateSchema instanceof Error) throw new Error(validateSchema.message);

    const result = await createTransactionService({ account_id: accountId, amount, type });

    if (!result) {
      res.status(401).json({
        message: "Create transaction failed.",
      });
    }

    res.status(200).json("Your transaction was saved successfuly");
  } catch (error) {
    next(error);
  }
};

export const SortTransactionsController: RequestHandler = async (req: Request, res: Response) => {
  res.status(200).send({
    message: "SortTransactionsController",
  });
};

export const DeleteTransactionController: RequestHandler = async (req: Request, res: Response) => {
  const transactionId: number = +req.params?.transactionId;
  const userId: number = +req.currentUser.userId;
  const result = await deleteTransactionService({ transactionId, userId });

  if (!result) {
    res.status(401).json({
      message: "Delete transaction failed",
    });
  }

  res.status(200).json("The transaction was deleted");
};
