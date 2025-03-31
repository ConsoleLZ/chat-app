const express = require('express');
const mysql2 = require('mysql2');
const { dbConfig, momentsTable } = require('../db.config');
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
		// 使用 ON DUPLICATE KEY UPDATE 处理可能的重复插入
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

module.exports = router;
