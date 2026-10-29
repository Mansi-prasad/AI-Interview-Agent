import express from "express";
import { googleAuth, login, logOut, register } from "../controllers/auth.controller.js";

const authRouter = express.Router();

authRouter.post("/google", googleAuth);
authRouter.get("/logout", logOut);

authRouter.post("/register", register);
authRouter.post("/login", login);

export default authRouter;
