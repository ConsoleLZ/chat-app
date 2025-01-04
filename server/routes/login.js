const express = require("express");
const mysql2 = require("mysql2");
const router = express.Router();
const {dbConfig, userTable} = require('../db.config')

/* GET home page. */
router.post("/login", async function (req, res) {
  console.log(dbConfig)
  console.log(req.body)
  // a = "users";
  // // 创建连接池
  // const config = handleConfig();
  // const promisePool = mysql2.createPool(config).promise();
  // let users = await promisePool.query(
  //   `SELECT * FROM ${a} WHERE name='${req.body.account}' AND password='${req.body.password}'`
  // ); //sql语句
  // console.log(users[0]);
  // if (users[0].length) {
  //   res.send({ ok: 1 });
  // } else {
  //   res.send({ ok: 0 });
  // }
});
module.exports = router;