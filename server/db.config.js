const host = '172.20.104.44'

function dbConfig() {
	return {
		host,
		port: 3306,
		user: 'root',
		password: '123456',
		database: 'chat-app',
		connectionLimit: 1
	};
}

const redisConfig = {
	host,
	port: 6379,
	password: '123456'
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
