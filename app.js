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

app.get("/api/users", usersHandlers.getUsers);

app.get("/api/users/:id", usersHandlers.getUsersById);

app.post("/api/users/", usersHandlers.postUser);

app.put("/api/users/:id",usersHandlers.putUserByID);

app.delete("/api/users/:id",usersHandlers.deleteUser);

app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});
