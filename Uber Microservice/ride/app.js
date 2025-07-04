import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { connectToDb } from "../user/db/db.js";

dotenv.config();

const app = express();
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

connectToDb();

export default app;