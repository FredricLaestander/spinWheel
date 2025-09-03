import express from "express";
import { createUser, getUserById, getUsers, } from "../controllers/userController";

const router = express.Router();


router.post("/users", createUser); 
router.get("/users", getUsers); 
router.get("/users/:id", getUserById); 

export default router;