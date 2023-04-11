import express from "express";
import usersRoutes from "./user.routes";

const router = express.Router();

router.use("/user", usersRoutes);

export default router;
