const express = require('express');
const mysql2 = require('mysql2');
const { dbConfig, contactsTable, contactsApplicationTable } = require('../db.config');

// 创建一个全局的连接池
const promisePool = mysql2.createPool(dbConfig()).promise();

const router = express.Router();

// 同意申请
router.post('/agree-application', async function (req, res) {
	const { contactUserId, userId, name, avatar, isUpdate } = req.body;

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
			`INSERT INTO ${contactsTable} (contactUserId, userId, name, avatar)
         VALUES (?, ?, ?, ?)
         ON DUPLICATE KEY UPDATE name = VALUES(name), avatar = VALUES(avatar)`,
			[contactUserId, userId, name, avatar]
		);

		// 检查 affectedRows 判断是否成功插入或更新
		if (result.affectedRows > 0) {
			// 如果 isUpdate 为 true，则更新 contactsApplicationTable 中对应的 agree 字段
			if (isUpdate) {
				await promisePool.query(
					`UPDATE ${contactsApplicationTable}
           SET agree = 1
           WHERE userId = ? AND contactUserId = ?`,
					[userId, contactUserId]
				);
			}

			res.json({
				ok: true,
				message: '操作成功'
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

// 查询联系人
router.get('/get-contacts', async function (req, res) {
	const { userId } = req.query;

	// 参数验证
	if (!userId) {
		return res.status(400).json({
			ok: false,
			message: '缺少用户ID参数'
		});
	}

	// 分类函数
	function classifyContacts(contacts) {
		// 预定义的分组名称
		const predefinedGroups = ['normal', 'friend', 'schoolmate', 'family', 'particularly'];
		// 初始化结果对象，所有预定义分组都设置为空数组
		const result = predefinedGroups.reduce((acc, group) => {
			acc[group] = [];
			return acc;
		}, {});

		// 根据联系人的分组添加到相应数组中
		contacts.forEach(contact => {
			let group = contact.grouping || 'unclassified';
			// 如果不是预定义的分组，使用 'unclassified'
			if (predefinedGroups.includes(group)) {
				result[group].push(contact);
			} else {
				// 确保 'unclassified' 也在预定义分组列表中，或者单独处理
				if (!result['unclassified']) {
					result['unclassified'] = [];
				}
				result['unclassified'].push(contact);
			}
		});

		return result;
	}

	try {
		// 构建 SQL 查询语句
		let sql = `SELECT *
                 FROM ${contactsTable} 
                 WHERE userId = ?`;

		// 执行查询
		const [rows] = await promisePool.query(sql, [userId]);
		// 检查查询结果
		if (rows.length > 0) {
			res.json({
				ok: true,
				contacts: rows,
				classifyContacts: classifyContacts(rows)
			});
		} else {
			res.json({
				ok: false,
				message: '未找到联系人'
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
