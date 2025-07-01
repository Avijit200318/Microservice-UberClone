import express from "express";
import { login, logout, profile, userRegister } from "../controller/user.controller.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", userRegister);
router.post("/login", login);
router.get("/logout", logout);
router.get("/profile", authMiddleware, profile);

export default router;