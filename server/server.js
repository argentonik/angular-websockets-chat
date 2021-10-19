import WebSocket, { WebSocketServer } from 'ws';
import url from 'url';

const wsServer = new WebSocketServer({
  port: 3000,
  clientTracking: true,
});
const chatBotName = 'Chat Bot';

wsServer.on('connection', (ws, req) => {
  const username = url.parse(req.url, true)?.query?.username;
  wsServer.broadcastAllExcept(JSON.stringify({
    username: chatBotName,
    text: `${username} joined chat`
  }), ws);

  ws.on('message', (data) => {
    const {text} = JSON.parse(data);
    wsServer.broadcastAll(JSON.stringify({username, text}));
  });

  ws.on('close', () => {
    wsServer.broadcastAll(JSON.stringify({
      username: chatBotName,
      text: `${username} leaved chat`
    }))
  });
});

wsServer.broadcastAll = (msg) => {
  wsServer.clients.forEach(function each(client) {
    client.send(msg);
  });
};

wsServer.broadcastAllExcept = (msg, sender) => {
  wsServer.clients.forEach((client) => {
    if (client !== sender) {
      client.send(msg);
    }
  });
};
