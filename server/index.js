import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/connect.js";
import { userRouter } from "./router/user.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 2000;

connectDB();

app.use(express.json());
app.use(cors({ origin: "*" }));
app.use("/auth", userRouter);

app.listen(port, () => console.log(`Server is listening in port ${port}`));
