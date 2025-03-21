var express = require('express');
var router = express.Router();
const multer  = require('multer')
const uploadImages = multer({ dest: 'upload/images' })

// 处理图片上传
router.post('/upload-images',uploadImages.single("file"),function(req, res, next) {
  res.send({ok:1})
});

module.exports = router;