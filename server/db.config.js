function dbConfig() {
  return {
    host: "192.168.0.104",
    port: 3306,
    user: "root",
    password: "123456",
    database: "chat-app",
    connectionLimit: 1,
  };
}

// 用户表名
const userTable = 'users'

module.exports = {
    dbConfig,
    userTable
}