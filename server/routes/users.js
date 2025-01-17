const express = require('express');
const mysql2 = require('mysql2');
const { dbConfig, userTable } = require('../db.config');
const { tokenManager } = require('../tokenManager');
const dayjs = require('dayjs');
const bcrypt = require('bcrypt'); // 引入 bcrypt 用于密码加密

// 创建一个全局的连接池
const promisePool = mysql2.createPool(dbConfig()).promise();

const router = express.Router();

// 登录
router.post('/login', async function (req, res) {
	const { account, password } = req.body;

	if (!account || !password) {
		return res.status(400).json({
			ok: false,
			message: '账户或者密码不能为空'
		});
	}

	try {
		const [rows] = await promisePool.query(`SELECT * FROM ${userTable} WHERE account = ?`, [account]);

		if (rows.length === 0) {
			return res.status(401).json({
				ok: false,
				message: '账号或密码错误'
			});
		}

		const user = rows[0];

		// 验证密码
		const isPasswordValid = await bcrypt.compare(password, user.password);
		if (!isPasswordValid) {
			return res.status(401).json({
				ok: false,
				message: '账号或密码错误'
			});
		}

		res.json({
			ok: true,
			token: tokenManager().encryptToken(user, '24h'),
			userInfo: {
				id: user.id,
				name: user.name,
				avatar: user.avatar
			}
		});
	} catch (error) {
		console.error('数据库交互失败:', error);
		res.status(500).json({
			ok: false,
			message: '服务器发生错误'
		});
	}
});

// 注册
router.post('/register', async function (req, res) {
	const { name, account, password } = req.body;

	if (!name || !account || !password) {
		return res.status(400).json({
			ok: false,
			message: '参数不能为空'
		});
	}

	try {
		// 对密码进行哈希处理
		const hashedPassword = await bcrypt.hash(password, 10);

		const [result] = await promisePool.query(
			`INSERT INTO ${userTable} (name, account, password, createTime) VALUES (?, ?, ?, ?)`,
			[
				name,
				account,
				hashedPassword,
				dayjs().format('YYYY-MM-DD HH:mm:ss')
			]
		);

		if (result.affectedRows > 0) {
			res.json({
				ok: true,
				message: '注册成功'
			});
		} else {
			res.status(500).json({
				ok: false,
				message: '注册失败'
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

// 根据账号或者名字搜索用户
router.get('/search-users', async function (req, res) {
	const { searchValue } = req.query;

	if (!searchValue) {
		return res.status(400).json({
			ok: false,
			message: '参数不能为空'
		});
	}

	try {
		const [rows] = await promisePool.query(
			`SELECT id, name, avatar, account, createTime 
       FROM ${userTable} 
       WHERE account = ? OR name LIKE CONCAT('%', ?, '%')`,
			[searchValue, searchValue]
		);

		if (rows.length > 0) {
			res.json({
				ok: true,
				users: rows
			});
		} else {
			res.status(404).json({
				ok: false,
				message: '未查询到结果'
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
