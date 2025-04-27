const express = require('express');
const router = express.Router();
const mysql2 = require('mysql2');
const { dbConfig, expressionPackTable } = require('../db.config');

// 创建一个全局的连接池
const promisePool = mysql2.createPool(dbConfig()).promise();

// 新增一张表情包
router.post('/add-expression', async function (req, res) {
    const { userId, url } = req.body;

    // 参数验证
    if (!userId || !url) {
        return res.status(400).json({
            ok: false,
            message: '参数为空'
        });
    }

    try {
        const [result] = await promisePool.query(
            `INSERT INTO ${expressionPackTable} (userId, url) VALUES (?, ?)`,
            [userId, url]
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

// 获取表情包数据
router.get('/get-expression', async function (req, res) {
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
				   FROM ${expressionPackTable} 
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
