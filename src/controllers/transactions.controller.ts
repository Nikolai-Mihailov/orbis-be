import { Request, Response, RequestHandler } from "express";

//  TO DO - to add those roots in routes
//  TO DO - to add paggination, it's mandatory parameter

export const GetTrannsactionsController: RequestHandler = async (req: Request, res: Response) => {
  res.status(200).send({
    message: "GetTrannsactionsController",
  });
};

export const CreateTransactionController: RequestHandler = async (req: Request, res: Response) => {
  res.status(200).send({
    message: "AddTransactionController",
  });
};

export const SortTransactionsController: RequestHandler = async (req: Request, res: Response) => {
  res.status(200).send({
    message: "AddTransactionController",
  });
};

export const DeleteTransactionController: RequestHandler = async (req: Request, res: Response) => {
  res.status(200).send({
    message: "DeleteTransactionController",
  });
};
