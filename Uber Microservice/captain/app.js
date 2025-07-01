import express from "express";
import captainRoute from "./routes/captain.routes.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { connectToDb } from "./db/db.js";

dotenv.config();

const app = express();
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

connectToDb();

app.use(express.json());

app.use("/", captainRoute);

export default app;