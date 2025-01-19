function dbConfig() {
	return {
		host: '192.168.0.104',
		port: 3306,
		user: 'root',
		password: '123456',
		database: 'chat-app',
		connectionLimit: 1
	};
}

const redisConfig = {
	host: '192.168.0.104', // Redis服务器地址
	port: 6379, // Redis服务器端口
	password: '123456' // Redis密码
};

// 数据库所有的表
const table = {
	// 用户表
	userTable: 'users',
	// 联系人表
	contactsTable: 'contacts',
	// 联系人申请表
	contactsApplicationTable: 'contactsApplication'
};

module.exports = {
	dbConfig,
	redisConfig,
	...table
};
