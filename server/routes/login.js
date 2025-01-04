const express = require("express");
const mysql2 = require("mysql2");
const router = express.Router();
const {dbConfig, userTable} = require('../db.config')
const {tokenManager} = require('../tokenManager')

/* GET home page. */
router.post("/login", async function (req, res) {
  // // 创建连接池
  const config = dbConfig();
  const promisePool = mysql2.createPool(config).promise();
  let users = await promisePool.query(
    `SELECT * FROM ${userTable} WHERE account='${req.body.account}' AND password='${req.body.password}'`
  ); //sql语句
  if (users[0].length) {
    res.send({ 
      ok: 1,
      token: tokenManager().encryptToken(users[0][0], '1h')
     });
  } else {
    res.send({ ok: 0 });
  }
});
module.exports = router;