function dbConfig() {
	return {
		host: '172.20.104.49',
		port: 3306,
		user: 'root',
		password: '123456',
		database: 'chat-app',
		connectionLimit: 1
	};
}

const redisConfig = {
	host: '172.20.104.49', // Redis服务器地址
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
	contactsApplicationTable: 'contactsApplication',
	// 群组表
	groupsTable: 'groups',
	// 群组成员表
	groupMembersTable: 'groupMembers'
};

module.exports = {
	dbConfig,
	redisConfig,
	...table
};
