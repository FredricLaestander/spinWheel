import express from "express";
import dotenv from "dotenv";
import type { Request, Response } from "express";
import connectDB from "./database/db";
import router from "./routes/userRoute";
import spinRouter from "./routes/spinRoute";


dotenv.config();

const app = express();


app.use(express.json());
app.use("/",spinRouter)
app.use ("/", router)
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});




connectDB().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`server ready on http://localhost:${process.env.PORT}`);
  });
});

export default app;
