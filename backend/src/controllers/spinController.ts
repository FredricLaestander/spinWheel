import { Request, Response } from "express";
import { Spins } from "../models/spin";
import { User } from "../models/user";

export const createSpin = async (req: Request, res: Response) => {
  try {
    const { user_id, amount } = req.body;

 
    const user = await User.findById(user_id);
    if (!user) return res.status(404).json({ message: "User not found" });


    const newSpin = new Spins({ user_id, amount });
    await newSpin.save();

    user.unused_spins += 1;
    await user.save();

    res.status(201).json({
      message: `Spin created successfully for user ${user.name}`,
      spin: newSpin,
      user: { id: user._id, name: user.name, unused_spins: user.unused_spins },
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error creating spin:", error);
      return res.status(500).json({ message: "Something went wrong", error: error.message });
    }
  }
};


export const spinAction = async (req: Request, res: Response) => {
  try {
    const { user_id } = req.params;


    const user = await User.findById(user_id);
    if (!user) return res.status(404).json({ message: "User not found" });


    const num = Math.floor(Math.random() * 100);
    let reward = "";

    switch (true) {
      case num <= 50:
        reward = "Normal prize";
        break;
      case num <= 70:
        reward = "Opra ticket";
        break;
      case num <= 85:
        reward = "Macbook Air";
        break;
      case num <= 95:
        reward = "Trip to Kenya";
        break;
      case num <= 100:
        reward = "JetPlane";
        break;
    }


    const newSpin = new Spins({ user_id, amount: 1 });
    await newSpin.save();

    res.status(200).json({
      message: `${user.name} got a reward: ${reward}!`,
      reward,
      spin: newSpin,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error performing spin:", error);
      return res.status(500).json({ message: "Something went wrong", error: error.message });
    }
  }
};

export const getSpins = async (req: Request, res: Response) => {
  try {
    const spins = await Spins.find().populate("user_id", "name credit unused_spins");
    res.json(spins);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: "Error fetching spins", error: error.message });
    }
  }
};
