// @ts-nocheck

require("dotenv").config();

const mysql = require("mysql2/promise");

const database = mysql.createPool({
  host: process.env.DB_HOST, // address of the server
  port: process.env.DB_PORT, // port of the DB server (mysql), not to be confused with the APP_PORT !
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

module.exports = {
  getUsers,
  getUsersById,
};
