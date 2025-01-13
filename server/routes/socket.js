const { WebSocketServer } = require("ws")

const wss = new WebSocketServer({ port: 3001 });

wss.on('connection', (ws)=>{
  console.log('连接成功')

  ws.on('message', function message(data) {
    console.log('received: %s', data);
  });

  // 检测用户的断开
  ws.on('close', function close() {
    console.log("用户断开连接")
  });
})