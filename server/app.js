var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mime = require('mime-types');
const fs = require('fs');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var contactsRouter = require('./routes/contacts');
var contactsApplicationRouter = require('./routes/contactsApplication');
var groupsRouter = require('./routes/groups');
var uploadRouter = require('./routes/upload');
var momentsRouter = require('./routes/moments');

var app = express();

//设置允许跨域访问该服务.
app.all('*', function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', '*');
	res.header('Access-Control-Allow-Methods', '*');
	res.header('Content-Type', 'application/json;charset=utf-8');
	next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'upload')));

// 正确解析图片文件的MIME类型
app.get('/image/:name', (req, res) => {
	const imgPath = path.join(__dirname, 'upload/images', req.params.name);
	// 检查文件是否存在
	fs.access(imgPath, fs.constants.F_OK, err => {
		if (err) {
			console.error(`文件未找到: ${imgPath}`);
			res.status(404).send('文件未找到');
			return;
		}

		const contentType = mime.lookup(imgPath); // 获取正确的MIME类型
		if (contentType) {
			res.setHeader('Content-Type', contentType);
		}

		const readStream = fs.createReadStream(imgPath);
		readStream
			.on('error', streamErr => {
				console.error(`读取文件时出错: ${streamErr.message}`);
				res.status(500).send('服务器内部错误');
			})
			.pipe(res);
	});
});

app.use('/', indexRouter);
app.use('/api', usersRouter);
app.use('/api', contactsRouter);
app.use('/api', contactsApplicationRouter);
app.use('/api', groupsRouter);
app.use('/api', uploadRouter);
app.use('/api', momentsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

module.exports = app;
