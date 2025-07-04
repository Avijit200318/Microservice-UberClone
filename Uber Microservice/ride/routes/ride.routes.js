import express from "express";
import { authUser } from "../middleware/auth.middleware.js";
import { createRide } from "../controllers/ride.controller.js";

const router = express.Router();

router.post("/create-ride", authUser, createRide)

export default router;