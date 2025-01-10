const express = require("express");
const mysql2 = require("mysql2");
const { dbConfig, contactsTable } = require("../db.config");

// 创建一个全局的连接池
const promisePool = mysql2.createPool(dbConfig()).promise();

const router = express.Router();

// 添加联系人
router.post("/add-contact-people", async function (req, res) {
  const { contactUserId, userId, name, avatar } = req.body;

  // 参数验证
  if (!contactUserId || !userId || !name || !avatar) {
    return res.status(400).json({
      ok: false,
      message: "参数为空",
    });
  }

  try {
    // 使用 ON DUPLICATE KEY UPDATE 处理可能的重复插入
    const [result] = await promisePool.query(
      `INSERT INTO ${contactsTable} (contactUserId, userId, name, avatar)
         VALUES (?, ?, ?, ?)
         ON DUPLICATE KEY UPDATE name = VALUES(name), avatar = VALUES(avatar)`,
      [contactUserId, userId, name, avatar]
    );

    // 检查 affectedRows 判断是否成功插入或更新
    if (result.affectedRows > 0) {
      res.json({
        ok: true,
        message: "添加成功或已更新",
      });
    } else {
      res.status(500).json({
        ok: false,
        message: "操作失败",
      });
    }
  } catch (error) {
    console.error("数据库交互失败:", error);
    res.status(500).json({
      ok: false,
      message: "服务器发生错误",
    });
  }
});

module.exports = router;
