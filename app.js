// @ts-nocheck
require("dotenv").config();
const express = require("express");
const app = express();

const port = 5000;

app.use(express.json());

const welcome = (req, res) => {
  res.send("Welcome to my User List");
};


app.get("/", welcome);

const usersHandlers = require("./usersHandlers");

const { validateUser } = require("./validators.js");
const { hashPassword, verifyPassword, verifyToken } = require("./auth.js");

app.get("/api/users", usersHandlers.getUsers);

app.get("/api/users/:id", usersHandlers.getUsersById);


app.post("/api/users/", hashPassword ,validateUser, usersHandlers.postUser);
app.post(
  "/api/login",
  usersHandlers.getUserByEmailWithPasswordAndPassToNext,
  verifyPassword

); 

app.use(verifyToken);

app.put("/api/users/:id",hashPassword ,validateUser, usersHandlers.putUserByID);

app.delete("/api/users/:id",usersHandlers.deleteUser);

app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});
