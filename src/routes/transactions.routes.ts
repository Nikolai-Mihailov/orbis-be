import express, { Router } from "express";
import { CreateTransactionController, DeleteTransactionController } from "../controllers/transactions.controller";

const router: Router = express.Router();

router.post("/create-transaction", CreateTransactionController);
router.delete("/delete-transaction/:transactionId", DeleteTransactionController);

export default router;
