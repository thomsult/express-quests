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
  const initialSql = "select * from user_register";
  const where = [];

  if (req.query.language != null) {
    where.push({
      column: "language",
      value: req.query.language,
      operator: "=",
    });
  }
  if (req.query.city != null) {
    where.push({
      column: "city",
      value: req.query.city,
      operator: "=",
    });
  }
 
  database
  .query(where.reduce(
    (sql, { column, operator }, index) =>
      `${sql} ${index === 0 ? "where" : "and"} ${column} ${operator} ?`,initialSql)+";",
    where.map(({ value }) => value))
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
      res.status(500).send(`Error saving user :  ${err.sqlMessage}`);
    });
};

const putUserByID = (req,res)=>{
  const id = parseInt(req.params.id);
  const { firstname, lastname, username } = req.body;
  database
  .query("UPDATE user_register SET firstname = ?, lastname = ?, username = ? WHERE id = ?;", [firstname, lastname, username, id])
  .then(([result]) => {
    if (result.affectedRows === 0) {
      res.status(404).send("Not Found");
    } else {
      res.sendStatus(204);
    }
  })
    .catch((err) => {
      console.error(err);
      res.status(500).send(`Error editing user :  ${err.sqlMessage}`);
    });
}

const deleteUser = (req, res) => {
  const id = parseInt(req.params.id);
  database
  .query("delete from user_register where id = ?", [id])
  .then(([result]) => {
    if (result.affectedRows === 0) {
      res.status(404).send("Not Found");
    } else {
      res.sendStatus(204);
    }
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send("Error deleting user");
  });
};




module.exports = {
  getUsers,
  getUsersById,
  postUser,
  putUserByID,
  deleteUser
};
