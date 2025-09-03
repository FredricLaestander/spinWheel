import express from "express";
import { createSpin, spinAction, getSpins } from "../controllers/spinController";

const spinRouter = express.Router();

spinRouter.post("/spins", createSpin);
spinRouter.post("/spins/:user_id", spinAction);
spinRouter.get("/spins", getSpins);

export default spinRouter;
