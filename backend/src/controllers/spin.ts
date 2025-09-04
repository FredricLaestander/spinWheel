import { Request, Response } from "express";
import { Spin } from "../models/spin";
import { User } from "../models/user";

export const addSpin = async (req: Request, res: Response) => {
  try {
    const { user_id } = req.body;

    const user = await User.findById(user_id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.unused_spins += 1;
    await user.save();

    res.status(201).json({
      message: `Spin added successfully for user ${user.name}`,
      user: { id: user._id, name: user.name, unused_spins: user.unused_spins },
    });
  } catch (error) {
    console.error("Error creating spin:", error);
    return res
      .status(500)
      .json({ message: "Something went wrong when adding a spin" });
  }
};

export const useOneSpin = async (req: Request, res: Response) => {
  try {
    const { user_id } = req.params;

    const user = await User.findById(user_id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.unused_spins === 0) {
      return res.status(400).json({
        message: "You dont have any spins",
      });
    }
    user.unused_spins -= 1;

    const prizes = [
      { amount: 10, weight: 50 },
      { amount: 20, weight: 25 },
      { amount: 50, weight: 15 },
      { amount: 100, weight: 7 },
      { amount: 500, weight: 3 },
    ];

    const getRandomPrize = () => {
      const totalWeight = prizes.reduce((sum, prize) => sum + prize.weight, 0);
      const randomWeight = Math.random() * totalWeight;

      let currentWeight = 0;

      for (const prize of prizes) {
        currentWeight += prize.weight;
        if (randomWeight <= currentWeight) {
          return prize;
        }
      }
      return prizes[0];
    };
    const prize = getRandomPrize();
    user.credit += prize.amount;

    const userHistory = new Spin({ amount: prize.amount, user_id });
    await user.save();
    await userHistory.save();
    return res.status(200).json({ message: `You won ${prize.amount}SEK` });
  } catch (error) {
    console.error("Error performing spin:", error);
    return res
      .status(500)
      .json({ message: "Something went wrong when trying to use a spin" });
  }
};

export const getUserSpinHistory = async (req: Request, res: Response) => {
  try {
    const { user_id } = req.params;
    const spins = await Spin.find({ user_id });

    if (!spins || spins.length === 0) {
      return res
        .status(404)
        .json({ message: "No spin history found for this user" });
    }

    res.status(200).json(spins);
  } catch (error) {
    console.error("Error getting users spin history");
    res.status(500).json({ message: "Error fetching spins" });
  }
};
