import express, { Router } from "express";
import { CreateUserController, LogOutController, LoginController } from "../controllers/user.controller";
import { isAuthenticated } from "../helpers/middlewares/authentication";

const router: Router = express.Router();

//  TO DO  - to add middware for logged users
router.post("/create-user", CreateUserController);
router.post("/login", LoginController);
router.get("/logout", isAuthenticated, LogOutController);

export default router;
