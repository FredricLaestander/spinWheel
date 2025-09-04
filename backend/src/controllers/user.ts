import { Request, Response } from "express";
import { User } from "../models/user";

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, password } = req.body;

    const existingUser = await User.findOne({ name });
    if (existingUser) {
      return res.status(400).json({ message: "User exists already" });
    }

    const newUser = new User({ name, password });
    await newUser.save();

    res.status(201).json({ message: `User ${name} created successfully` });
  } catch (error) {
    console.error("Error creating user:", error);
    return res
      .status(500)
      .json({ message: "Something went wrong when creating a user" });
  }
};

export const getUserById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404).json({ message: "User not found! " });
    }
    res.json(user);
  } catch (error) {
    console.error("Error getting user by id:", error);
    res.status(500).json({ message: "Could not fetch user!" });
  }
};
