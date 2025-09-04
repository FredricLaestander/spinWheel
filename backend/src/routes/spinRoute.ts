import express from "express";
import { useOneSpin, addSpin, getUserSpinHistory } from "../controllers/spin";

const spinRouter = express.Router();

spinRouter.post("/spins/:user_id", useOneSpin);
spinRouter.get("/spins", addSpin);
spinRouter.get("/spins/:user_id", getUserSpinHistory);

export default spinRouter;
