import express from "express";
import usersRoutes from "./user.routes";
import transactionsRoutes from "./transactions.routes";
import { isAuthenticated } from "../helpers/middlewares/authentication";

const router = express.Router();

router.use("/user", usersRoutes);
router.use("/transaction", isAuthenticated, transactionsRoutes);

export default router;
