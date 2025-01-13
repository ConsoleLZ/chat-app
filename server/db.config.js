function dbConfig() {
  return {
    host: "172.20.104.6",
    port: 3306,
    user: "root",
    password: "123456",
    database: "chat-app",
    connectionLimit: 1,
  };
}

// 数据库所有的表
const table = {
  // 用户表
  userTable: 'users',
  // 联系人表
  contactsTable: 'contacts'
}

module.exports = {
    dbConfig,
    ...table
}