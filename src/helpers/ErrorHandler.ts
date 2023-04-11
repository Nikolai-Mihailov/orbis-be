import { NextFunction, Request, Response } from "express";

const ErrorHandler = (err: { message: string; stack: string }, req: Request, res: Response, next: NextFunction) => {
  console.log("<<< Middleware Error Hadnling >>>");
  const errStatus = 400;
  const errMsg = err.message || "Something went wrong";
  res.status(errStatus).json({
    success: false,
    status: errStatus,
    message: errMsg,
    stack: process.env.NODE_ENV === "development" ? err.stack : {},
  });
};

export default ErrorHandler;
