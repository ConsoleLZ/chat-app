var express = require('express');
var router = express.Router();
const multer = require('multer');
const path = require('path');
const { UPLOAD_URL } = require('../constants');

// 设置存储属性
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'upload/images/'); // 文件保存路径
	},
	filename: function (req, file, cb) {
		// 获取文件扩展名
		const ext = path.extname(file.originalname);
		// 使用当前时间戳作为文件名，避免重复
		cb(null, Date.now() + ext);
	}
});

// 文件过滤器，确保只上传图片文件
const fileFilter = (req, file, cb) => {
	const allowedTypes = ['.png', '.jpg', '.jpeg', '.gif'];
	const ext = path.extname(file.originalname);
	if (allowedTypes.includes(ext.toLowerCase())) {
		cb(null, true); // 接受文件
	} else {
		cb(new Error('只允许上传图片文件'), false); // 拒绝文件
	}
};

const uploadImages = multer({ storage: storage, fileFilter: fileFilter });

// 处理图片上传
router.post('/upload-images', uploadImages.single('file'), function (req, res, next) {
	if (!req.file) {
		return res.status(400).send({ error: '文件上传失败' });
	}
	// 返回文件上传信息
	res.send({
		ok: 1,
		id: req.body?.id,
		originalName: req.file.originalname,
		fileName: req.file.filename,
		url: UPLOAD_URL + req.file.filename
	});
});

module.exports = router;
