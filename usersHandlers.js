// @ts-nocheck

require("dotenv").config();

const mysql = require("mysql2/promise");

const database = mysql.createPool({
  host: process.env.DB_HOST, // address of the server
  port: parseInt(process.env.DB_PORT||"3309"), // port of the DB server (mysql), not to be confused with the APP_PORT !
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});


const getUsers = (req, res) => {
  database
  .query("select * from user_register")
    .then(([Users]) => {
      res.json(Users);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
 
};

const getUsersById = (req, res) => {
  const id = parseInt(req.params.id);
  database
  .query("select * from user_register where id = ?", [id])
    .then(([Users]) => {
      if (Users.length > 0) {
        res.json(Users);
      } else {
        res.status(404).send("Not Found");
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};




const postUser = (req, res) =>{
  const { firstname, lastname, username } = req.body;
  database
    .query(
      "INSERT INTO user_register (firstname, lastname, username) VALUES (?, ?, ?)",
      [firstname, lastname, username]
    )
    .then(([result]) => {
      res.location(`/api/users/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error saving user");
    });
};







module.exports = {
  getUsers,
  getUsersById,
  postUser,
};
