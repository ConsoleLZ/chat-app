const express = require("express");
const mysql2 = require("mysql2");
const router = express.Router();
const { dbConfig, userTable } = require("../db.config");
const { tokenManager } = require("../tokenManager");
const dayjs = require("dayjs");

// 登录
router.post("/login", async function (req, res) {
  if (!req.body.account || !req.body.password) {
    res.send({
      ok: false,
      message: "账户或者密码不能为空",
    });

    return;
  }
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
        token: tokenManager().encryptToken(users[0][0], "24h"),
        userInfo: {
          id: users[0][0].id,
          name: users[0][0].name,
          avatar: users[0][0].avatar,
        },
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

// 注册
router.post("/register", async function (req, res) {
  const { name, account, password } = req.body;
  if (!name || !account || !password) {
    res.send({
      ok: false,
      message: "参数不能为空",
    });

    return;
  }

  // 创建连接池
  try {
    const config = dbConfig();
    const promisePool = mysql2.createPool(config).promise();
    let sqlResult = await promisePool.query(
      `INSERT INTO ${userTable} (name, account, password, avatar, createTime) VALUES ('${name}', '${account}', '${password}', 'https://pic1.imgdb.cn/item/677e34bed0e0a243d4f1d025.png', '${dayjs().format(
        "YYYY-MM-DD HH:mm:ss"
      )}');`
    );
    if (sqlResult.length) {
      res.send({
        ok: true,
        message: "注册成功",
      });
    } else {
      res.send({
        ok: false,
        message: "注册失败",
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

// 根据账号搜索用户
router.post("/searchUsers", async function (req, res) {
  const { account } = req.body;
  if (!account) {
    res.send({
      ok: false,
      message: "参数不能为空",
    });

    return;
  }

  // 创建连接池
  try {
    const config = dbConfig();
    const promisePool = mysql2.createPool(config).promise();
    let users = await promisePool.query(
      `SELECT id,name,avatar,account,createTime FROM ${userTable} WHERE account='${account}'`
    );
    if (users[0].length) {
      res.send({
        ok: true,
        users: users[0],
      });
    } else {
      res.send({
        ok: false,
        message: "未查询到结果",
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
