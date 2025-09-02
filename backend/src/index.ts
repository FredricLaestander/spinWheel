import express from "express";
import dotenv from "dotenv";
import type { Request, Response } from "express";
import connectDB from "./database/db";

dotenv.config();

const app = express();

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.use(express.json());

connectDB().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`server ready on http://localhost:${process.env.PORT}`);
  });
});

export default app;
