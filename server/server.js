import WebSocket, { WebSocketServer } from 'ws';

const wsServer = new WebSocketServer({
  port: 3000,
  clientTracking: true,
});

wsServer.on('connection', (ws, req) => {
  console.log('connectionUrl', req.url);
  wsServer.broadcastAllExcept(JSON.stringify({text: 'New user join chat'}), ws);

  ws.on('message', (data) => {
    const {text} = JSON.parse(data);

    wsServer.broadcastAll(JSON.stringify({text}));
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
