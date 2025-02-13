const express = require('express');
const mysql2 = require('mysql2');
const { dbConfig, groupsTable, groupMembersTable } = require('../db.config');
const { v4: uuidv4 } = require('uuid');

// 创建一个全局的连接池
const promisePool = mysql2.createPool(dbConfig()).promise();

const router = express.Router();

// 创建群聊
router.post('/create-group', async function (req, res) {
	const groupId = uuidv4()
	const { name, ownerId } = req.body;

	// 参数验证
	if (!name || !ownerId) {
		return res.status(400).json({
			ok: false,
			message: '参数为空'
		});
	}

	try {
		// 确保使用反引号包裹表名，以防它是保留关键字
		const [result] = await promisePool.query(
			`INSERT INTO \`${groupsTable}\` (id, name, ownerId, createTime) VALUES (?, ?, ?, ?)`,
			[groupId, name, ownerId, Math.floor(Date.now() / 1000)] // 使用秒级别时间戳
		);

		// 检查 affectedRows 判断是否成功插入
		if (result.affectedRows > 0) {
			res.json({
				ok: true,
				message: '创建成功',
				insertId: result.insertId // 返回插入记录的ID
			});
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

module.exports = router;
