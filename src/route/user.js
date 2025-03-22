import express from "express";
import User from "../model/user.js";

const router = express.Router();
router.post("/user/signup", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
});

export default router;
