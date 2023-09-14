const mongoose = require("mongoose");
const supertest = require("supertest");
const bcrypt = require("bcrypt");
const helper = require("./test_helper");
const app = require("../app");

const api = supertest(app);
const User = require("../models/user");

beforeEach(async () => {
  await User.deleteMany({});
  const userObject = {
    username: "hellas",
    name: "Arto Hellas",
  };
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash("artospassword", saltRounds);
  userObject.passwordHash = passwordHash;
  const user = new User(userObject);
  await user.save();
});

describe("addition of a new user", () => {
  test("Making a POST request creates a new user", async () => {
    const newUser = {
      username: "jdoe",
      name: "John Doe",
      password: "johnspassword",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const users = await helper.usersInDb();

    const usernames = users.map((user) => user.username);

    expect(users).toHaveLength(2);
    expect(usernames).toContain("jdoe");
  });

  test("Missing username and/or password returns status 400 and an appropriate error message", async () => {
    const missingUsername = {
      name: "John Doe",
      password: "johnspassword",
    };

    const missingPassword = {
      username: "jdoe",
      name: "John Doe",
    };

    await api.post("/api/users").send(missingUsername).expect(400);

    await api.post("/api/users").send(missingPassword).expect(400);
  });

  test("username and/or password that are less than 3 characters long return status 400 and an appropriate error message", async () => {
    const invalidUsername = {
      username: "jd",
      name: "John Doe",
      password: "johnspassword",
    };

    const invalidPassword = {
      username: "jdoe",
      name: "John Doe",
      password: "jo",
    };

    await api.post("/api/users").send(invalidUsername).expect(400);

    await api.post("/api/users").send(invalidPassword).expect(400);
  });

  test("username which exists in the database gets rejected succssfully", async () => {
    const invalidUsername = {
      username: "hellas",
      name: "Hellen Astro",
      password: "hellenspassword",
    };

    await api.post("/api/users").send(invalidUsername).expect(400);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
