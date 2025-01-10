const express = require("express");
const mysql2 = require("mysql2");
const { dbConfig, contactsTable } = require("../db.config");

// 创建一个全局的连接池
const promisePool = mysql2.createPool(dbConfig()).promise();

const router = express.Router();

// 添加联系人
router.post("/add-contact-people", async function (req, res) {
  const { contactUserId, userId, name, avatar } = req.body;

  if (!contactUserId || !userId || !name || !avatar) {
    return res.status(400).json({
      ok: false,
      message: "参数为空",
    });
  }

  console.log(contactUserId, userId, name, avatar);
  //   try {
  //     const [rows] = await promisePool.query(
  //       `SELECT * FROM ${userTable} WHERE account = ?`,
  //       [account]
  //     );

  //     if (rows.length === 0) {
  //       return res.status(401).json({
  //         ok: false,
  //         message: "账号或密码错误",
  //       });
  //     }

  //     const user = rows[0];

  //     // 验证密码
  //     const isPasswordValid = await bcrypt.compare(password, user.password);
  //     if (!isPasswordValid) {
  //       return res.status(401).json({
  //         ok: false,
  //         message: "账号或密码错误",
  //       });
  //     }

  //     res.json({
  //       ok: true,
  //       token: tokenManager().encryptToken(user, "24h"),
  //       userInfo: {
  //         id: user.id,
  //         name: user.name,
  //         avatar: user.avatar,
  //       },
  //     });
  //   } catch (error) {
  //     console.error("数据库交互失败:", error);
  //     res.status(500).json({
  //       ok: false,
  //       message: "服务器发生错误",
  //     });
  //   }
});

module.exports = router;
