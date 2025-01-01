function dbConfig() {
  return {
    host: "192.168.0.105",
    port: 3306,
    user: "root",
    password: "123456",
    database: "chat-app",
    connectLimit: 1,
  };
}

// 用户表名
const userTable = 'user'

module.exports = {
    dbConfig,
    userTable
}