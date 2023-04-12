import express, { Router } from "express";
import { CreateTransactionController, DeleteTransactionController, GetAllTrannsactionsController } from "../controllers/transactions.controller";

const router: Router = express.Router();

router.get("/get-all-transactions", GetAllTrannsactionsController);
router.post("/create-transaction", CreateTransactionController);
router.delete("/delete-transaction/:transactionId", DeleteTransactionController);

export default router;
