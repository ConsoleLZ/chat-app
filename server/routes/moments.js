const express = require('express');
const mysql2 = require('mysql2');
const { dbConfig, momentsTable, userTable, contactsTable } = require('../db.config');
const { v4: uuidv4 } = require('uuid');

// 创建一个全局的连接池
const promisePool = mysql2.createPool(dbConfig()).promise();

const router = express.Router();

// 发布动态
router.post('/add-moment', async function (req, res) {
	const { userId, content, imgList } = req.body;

	// 参数验证
	if (!userId || !content || !imgList) {
		return res.status(400).json({
			ok: false,
			message: '参数为空'
		});
	}

	try {
		const [result] = await promisePool.query(
			`INSERT INTO ${momentsTable} (id, userId, content, imgList, createTime) VALUES (?, ?, ?, ?, ?)`,
			[uuidv4(), userId, content, JSON.stringify(imgList), Date.now()]
		);

		// 检查 affectedRows 判断是否成功插入或更新
		if (result.affectedRows > 0) {
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

// 获取朋友圈动态
router.get('/get-moments', async function (req, res) {
	const { userId } = req.query;

	// 参数验证
	if (!userId) {
		return res.status(400).json({
			ok: false,
			message: '缺少参数'
		});
	}

	try {
		const contactsInfo = await promisePool.query(`SELECT contactUserId FROM ${contactsTable} WHERE userId = ?`, [
			userId
		]);
		const contactUserIdArr = contactsInfo[0].map(item => item.contactUserId);

		// 构建 SQL 查询语句
		let sql = `
  			SELECT m.id, m.userId, m.content, m.imgList, m.createTime, m.thumbs, m.comments, u.name, u.avatar
    		FROM \`${momentsTable}\` m
    		INNER JOIN \`${userTable}\` u ON m.userId = u.id
    		WHERE m.userId IN (?)
		`;

		// 将当前用户的ID加入到联系人ID数组中，避免重复可以使用Set
		const queryIds = Array.from(new Set([...contactUserIdArr, parseInt(userId)]));

		// 执行查询
		const [rows] = await promisePool.query(sql, [queryIds]);
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

// 更新朋友圈点赞和评论
router.post('/update-moments', async function (req, res) {
	const { id, thumbs, comments } = req.body;
	// 参数验证
	if (!id) {
		return res.status(400).json({
			ok: false,
			message: '缺少参数'
		});
	}

	try {
		const [rows] = await promisePool.query(
			`UPDATE ${momentsTable} SET thumbs = ?, comments = ? WHERE id = ?`,
			[JSON.stringify(thumbs), JSON.stringify(comments), id]
		);

		if (rows.affectedRows > 0) {
			res.json({
				ok: true
			});
		} else {
			res.status(404).json({
				ok: false,
				message: '更新失败'
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

// 获取某条动态详情
router.get('/get-moments-detail', async function (req, res) {
	const { id } = req.query;

	// 参数验证
	if (!id) {
		return res.status(400).json({
			ok: false,
			message: '缺少参数'
		});
	}

	try {
		const [rows] = await promisePool.query(
			`SELECT m.id, m.userId, m.content, m.imgList, m.createTime, m.thumbs, m.comments, u.name, u.avatar
    		FROM \`${momentsTable}\` m
    		INNER JOIN \`${userTable}\` u WHERE m.id IN (?)`,
			[id]
		);

		if (rows.length > 0) {
			res.json({
				ok: true,
				detail: rows[0]
			});
		} else {
			res.status(404).json({
				ok: false,
				message: '参数错误'
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
