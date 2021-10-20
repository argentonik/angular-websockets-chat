import {WebSocketServer} from 'ws';
import url, {fileURLToPath} from 'url';
import {existsSync, readFileSync, writeFile} from "fs";
import * as path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const wsServer = new WebSocketServer({
  port: 3000,
  clientTracking: true,
});
wsServer.chatBotName = 'Chat Bot';

const log = existsSync(path.join(__dirname, `log`)) && readFileSync(path.join(__dirname, `log`));
const messages = parseJson(log) || [];

wsServer.on('connection', (ws, req) => {
  const username = url.parse(req.url, true)?.query?.username;

  wsServer.userJoinedChatNotification(username, ws);
  if (messages.length) {
    ws.send(JSON.stringify(messages));
  }

  ws.on('message', (data) => {
    const {text} = parseJson(data);
    if (text) {
      const message = wsServer.prepareMessage({username, text});
      messages.push({username, text});
      wsServer.broadcastAll(message);
    }
  });

  ws.on('close', () => {
    wsServer.userLeftChatNotification(username);
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

wsServer.userJoinedChatNotification = function(username, client) {
  const message = this.prepareMessage({
    username: this.chatBotName,
    text: `${username} joined chat`
  });

  if (message) {
    this.broadcastAllExcept(message, client);
  }
}

wsServer.userLeftChatNotification = function(username) {
  const message = this.prepareMessage({
    username: this.chatBotName,
    text: `${username} left chat`
  });

  if (message) {
    this.broadcastAll(message);
  }
}

wsServer.prepareMessage = function(message) {
  try {
    return JSON.stringify(message);
  } catch {
    return null;
  }
}

function parseJson(data) {
  try {
    return JSON.parse(data);
  } catch {
    return null;
  }
}

process.on('SIGINT', () => {
  wsServer.close();
  writeFile(path.join(__dirname, `log`), JSON.stringify(messages), err => {
    if (err) {
      console.log('err');
    }
    process.exit();
  });
});
