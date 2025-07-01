import express from "express";
import { captainRegister, login, logout, profile, toggleAvailability} from "../controller/captain.controller.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", captainRegister);
router.post("/login", login);
router.get("/logout", logout);
router.get("/profile", authMiddleware, profile);
// create a toggle
router.patch("/toggle-availability", authMiddleware, toggleAvailability)

export default router;