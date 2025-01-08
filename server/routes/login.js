const express = require("express");
const mysql2 = require("mysql2");
const router = express.Router();
const { dbConfig, userTable } = require("../db.config");
const { tokenManager } = require("../tokenManager");

// 登录
router.post("/login", async function (req, res) {
  // 创建连接池
  try {
    const config = dbConfig();
    const promisePool = mysql2.createPool(config).promise();
    let users = await promisePool.query(
      `SELECT * FROM ${userTable} WHERE account='${req.body.account}' AND password='${req.body.password}'`
    ); //sql语句
    if (users[0].length) {
      res.send({
        ok: true,
        token: tokenManager().encryptToken(users[0][0], "10s"),
      });
    } else {
      res.send({
        ok: false,
        message: "账号或密码错误",
      });
    }
  } catch (error) {
    console.log("数据库连接失败，请检查数据库是否存活");
    res.send({
      ok: false,
      message: "服务器发生错误",
    });
  }
});
module.exports = router;
