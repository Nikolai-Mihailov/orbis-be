import express, { Router } from "express";
import {
  CreateTransactionController,
  DeleteTransactionController,
  GetAllTrannsactionsController,
  UpdateTransactionController,
} from "../controllers/transactions.controller";

const router: Router = express.Router();

router.get("/get-all-transactions", GetAllTrannsactionsController);
router.post("/create-transaction", CreateTransactionController);
router.patch("/update-transaction/:transactionId", UpdateTransactionController);
router.delete("/delete-transaction/:transactionId", DeleteTransactionController);

export default router;
