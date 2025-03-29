import request from "supertest";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import app from "../src/app";
import User from "../src/model/user";
import { connectDB } from "../src/db/connection";
import dotenv from "dotenv";

dotenv.config();

jest.useRealTimers();
const userOneId = new mongoose.Types.ObjectId();
const userOne = {
  _id: userOneId,
  name: "Tanush",
  email: "Tanush@test.com",
  password: "1234567890",
  tokens: [{ token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET) }],
};
beforeEach(async () => {
  connectDB();
  await User.deleteMany();
  const user = new User(userOne);
  await user.save();
});
test("Should signup a new user", async () => {
  const response = await request(app)
    .post("/user/signup")
    .send({
      name: "Dhriti",
      email: "Dhriti@test.com",
      password: "1234567890",
    })
    .expect(201);
  //Assert that the database was changed correctly
  const user = await User.findById(response.body.user._id);
  expect(response.body).toMatchObject({
    user: {
      name: "Dhriti",
      email: "dhriti@test.com",
    },
    token: user.tokens[0].token,
  });
  expect(user.password).not.toBe("1234567890");
  expect(user.name).toBe("Dhriti");
});

test("should login existing user", async () => {
  const response = await request(app)
    .post("/user/login")
    .send({ email: userOne.email, password: userOne.password })
    .expect(200);
  const user = await User.findById(userOneId);
  expect(response.body.token).toBe(user.tokens[1].token);
});

test("should not login non-existent user", async () => {
  const response = await request(app)
    .post("/user/login")
    .send({ email: userOne.email, password: "123456" })
    .expect(400);
});

test("should logout already existing user", async () => {
  await request(app)
    .post("/user/logout")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
});
