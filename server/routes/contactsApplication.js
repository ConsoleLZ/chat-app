const express = require('express');
const mysql2 = require('mysql2');
const { dbConfig, contactsApplicationTable } = require('../db.config');

// 创建一个全局的连接池
const promisePool = mysql2.createPool(dbConfig()).promise();

const router = express.Router();

// 申请添加好友
router.post('/application', async function (req, res) {
	const { contactUserId, userId, name, avatar } = req.body;

	// 参数验证
	if (!contactUserId || !userId || !name || !avatar) {
		return res.status(400).json({
			ok: false,
			message: '参数为空'
		});
	}

	try {
		// 使用 ON DUPLICATE KEY UPDATE 处理可能的重复插入
		const [result] = await promisePool.query(
			`INSERT INTO ${contactsApplicationTable} (contactUserId, userId, name, avatar)
         VALUES (?, ?, ?, ?)
         ON DUPLICATE KEY UPDATE name = VALUES(name), avatar = VALUES(avatar)`,
			[contactUserId, userId, name, avatar]
		);

		// 检查 affectedRows 判断是否成功插入或更新
		if (result.affectedRows > 0) {
			if (result.insertId > 0) {
				res.json({
					ok: true,
					message: '申请成功'
				});
			} else {
				res.json({
					ok: false,
					message: '请勿重复添加'
				});
			}
		} else {
			res.status(500).json({
				ok: false,
				message: '操作失败'
			});
		}
	} catch (error) {
		console.error('数据库交互失败:', error);
		res.status(500).json({
			ok: false,
			message: '服务器发生错误'
		});
	}
});

// 查找正在申请成为联系人的用户
router.get('/get-application', async function (req, res) {
	const { contactUserId } = req.query;

	// 参数验证
	if (!contactUserId) {
		return res.status(400).json({
			ok: false,
			message: '缺少参数'
		});
	}

	try {
		// 构建 SQL 查询语句
		let sql = `SELECT *
				   FROM ${contactsApplicationTable} 
				   WHERE contactUserId = ?`;

		// 执行查询
		const [rows] = await promisePool.query(sql, [contactUserId]);
		// 检查查询结果
		if (rows.length > 0) {
			res.json({
				ok: true,
				users: rows
			});
		} else {
			res.json({
				ok: false,
				message: '暂无申请的朋友'
			});
		}
	} catch (error) {
		console.error('数据库交互失败:', error);
		res.status(500).json({
			ok: false,
			message: '服务器发生错误'
		});
	}
});

module.exports = router;
