const express = require('express');
const mysql2 = require('mysql2');
const { dbConfig, groupsTable, groupMembersTable } = require('../db.config');
const { v4: uuidv4 } = require('uuid');

// 创建一个全局的连接池
const promisePool = mysql2.createPool(dbConfig()).promise();

const router = express.Router();

// 创建群聊
router.post('/create-group', async function (req, res) {
	const groupId = uuidv4();
	const { name, ownerInfo, members } = req.body;

	// 参数验证
	if (!name || !ownerInfo?.id) {
		return res.status(400).json({
			ok: false,
			message: '参数为空'
		});
	}

	try {
		// 确保使用反引号包裹表名，以防它是保留关键字
		const [result] = await promisePool.query(
			`INSERT INTO \`${groupsTable}\` (id, name, ownerId, memberIds, createTime) VALUES (?, ?, ?, ?, ?)`,
			[groupId, name, ownerInfo.id, JSON.stringify(members.map(item=>item.contactUserId)), Date.now()]
		);

		// 检查 affectedRows 判断是否成功插入
		if (result.affectedRows > 0) {
			// 插入成员表
			members.forEach(async item => {
				await promisePool.query(
					`INSERT INTO \`${groupMembersTable}\` (groupId, userId, name, avatar, joinedTime) VALUES (?, ?, ?, ?, ?)`,
					[groupId, item.contactUserId, item.name, item.avatar, Date.now()]
				);
			});

			// 群主数据
			await promisePool.query(
				`INSERT INTO \`${groupMembersTable}\` (groupId, userId, name, avatar, joinedTime, role) VALUES (?, ?, ?, ?, ?, ?)`,
				[groupId, ownerInfo.id, ownerInfo.name, ownerInfo.avatar, Date.now(), 'master']
			);

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

// 获取群聊信息
router.get('/get-groups', async function (req, res) {
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
		let sql = `
  		SELECT g.id AS groupId, g.name AS groupName, g.avatar AS groupAvatar, g.memberIds AS memberIds, g.ownerId AS ownerId
    	FROM \`${groupMembersTable}\` gm
    	INNER JOIN \`${groupsTable}\` g ON gm.groupId = g.id
    	WHERE gm.userId = ?
		`;

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
				message: '该用户暂未加入群聊'
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
