import request from "supertest";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import app from "../src/app";
import User from "../src/model/user";
import { connectDB } from "../src/db/connection";
import dotenv from "dotenv";

dotenv.config()

jest.useRealTimers();

beforeEach(async () => {
  connectDB();
  await User.deleteMany();
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
  expect(user.name).toBe("Dhriti")
});
