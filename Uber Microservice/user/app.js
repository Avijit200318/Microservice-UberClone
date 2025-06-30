import express from "express";
import userRoute from "./routes/user.routes.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { connectToDb } from "./db/db.js";

dotenv.config();

const app = express();
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

connectToDb();

app.use(express.json());

app.use("/", userRoute);

export default app;