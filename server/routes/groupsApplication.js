const express = require('express');
const mysql2 = require('mysql2');
const { dbConfig, groupsApplicationTable, groupsTable } = require('../db.config');

// 创建一个全局的连接池
const promisePool = mysql2.createPool(dbConfig()).promise();

const router = express.Router();

// 申请进群
router.post('/application-group', async function (req, res) {
	const { groupId, userId, name, avatar, ownerId } = req.body;

	// 参数验证
	if (!groupId || !userId || !name || !ownerId) {
		return res.status(400).json({
			ok: false,
			message: '参数为空'
		});
	}

	try {
		// 使用 ON DUPLICATE KEY UPDATE 处理可能的重复插入
		const [result] = await promisePool.query(
			`INSERT INTO ${groupsApplicationTable} (groupId, userId, name, avatar, ownerId)
         VALUES (?, ?, ?, ?, ?)
         ON DUPLICATE KEY UPDATE name = VALUES(name), avatar = VALUES(avatar)`,
			[groupId, userId, name, avatar, ownerId]
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
					message: '请勿重复申请'
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

// 查找申请进群的用户
router.get('/get-application-group', async function (req, res) {
	const { userId } = req.query;

	// 参数验证
	if (!userId) {
		return res.status(400).json({
			ok: false,
			message: '缺少参数'
		});
	}

	try {
		// 构建 SQL 查询语句
		let sql = `SELECT *
				   FROM ${groupsApplicationTable} 
				   WHERE userId = ?`;

		// 执行查询
		const [rows] = await promisePool.query(sql, [userId]);
		// 检查查询结果
		if (rows.length > 0) {
			res.json({
				ok: true,
				data: rows
			});
		} else {
			res.json({
				ok: false,
				message: '暂无数据'
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
