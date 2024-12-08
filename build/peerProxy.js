// const { WebSocketServer } = require('ws');
// const uuid = require('uuid');

// function peerProxy(httpServer) {
//   // Create a websocket object
//   const wss = new WebSocketServer({ noServer: true });

//   // Handle the protocol upgrade from HTTP to WebSocket
//   httpServer.on('upgrade', (request, socket, head) => {
//     wss.handleUpgrade(request, socket, head, function done(ws) {
//       wss.emit('connection', ws, request);
//     });
//   });

//   // Keep track of all the connections so we can forward messages
//   let connections = [];

//   wss.on('connection', (ws) => {
//     const connection = { id: uuid.v4(), alive: true, ws: ws };
//     connections.push(connection);

//     // Forward messages to everyone except the sender
//     ws.on('message', function message(data) {
//       connections.forEach((c) => {
//         if (c.id !== connection.id) {
//           c.ws.send(data);
//         }
//       });
//     });

//     // Remove the closed connection so we don't try to forward anymore
//     ws.on('close', () => {
//       const pos = connections.findIndex((o, i) => o.id === connection.id);

//       if (pos >= 0) {
//         connections.splice(pos, 1);
//       }
//     });

//     // Respond to pong messages by marking the connection alive
//     ws.on('pong', () => {
//       connection.alive = true;
//     });
//   });

//   // Keep active connections alive
//   setInterval(() => {
//     connections.forEach((c) => {
//       // Kill any connection that didn't respond to the ping last time
//       if (!c.alive) {
//         c.ws.terminate();
//       } else {
//         c.alive = false;
//         c.ws.ping();
//       }
//     });
//   }, 10000);
// }

// module.exports = { peerProxy };


const { WebSocketServer } = require('ws');
const uuid = require('uuid');

function peerProxy(httpServer) {
  // Create a websocket object
  const wss = new WebSocketServer({ noServer: true });

  // Handle the protocol upgrade from HTTP to WebSocket
  httpServer.on('upgrade', (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, function done(ws) {
      wss.emit('connection', ws, request);
    });
  });

  // Keep track of all the connections so we can forward messages
  let connections = [];

  wss.on('connection', (ws) => {
    const connection = { id: uuid.v4(), alive: true, ws: ws, userName: null };
    connections.push(connection);

    ws.on('message', function message(data) {
      try {
        const parsedData = JSON.parse(data);
        handleMessage(parsedData, connection);
      } catch (err) {
        console.error('Failed to parse message:', err);
      }
    });

    // Remove the closed connection so we don't try to forward anymore
    ws.on('close', () => {
      const pos = connections.findIndex((o) => o.id === connection.id);

      if (pos >= 0) {
        connections.splice(pos, 1);
      }
    });

    // Respond to pong messages by marking the connection alive
    ws.on('pong', () => {
      connection.alive = true;
    });
  });

  // Keep active connections alive
  setInterval(() => {
    connections.forEach((c) => {
      // Kill any connection that didn't respond to the ping last time
      if (!c.alive) {
        c.ws.terminate();
      } else {
        c.alive = false;
        c.ws.ping();
      }
    });
  }, 10000);

  // Handle incoming messages
  function handleMessage(message, connection) {
    switch (message.type) {
      case 'authenticate':
        // Set the userName for the connection
        connection.userName = message.userName;
        console.log(`${connection.userName} authenticated.`);
        break;

      case 'broadcastEvent':
        // Broadcast the event to all other users
        connections.forEach((c) => {
          if (c.id !== connection.id) {
            c.ws.send(JSON.stringify({
              type: 'event',
              userName: connection.userName,
              eventType: message.eventType,
              data: message.data,
            }));
          }
        });
        console.log(`Broadcasted event from ${connection.userName}:`, message.eventType);
        break;

      default:
        console.warn('Unknown message type:', message.type);
    }
  }
}

module.exports = { peerProxy };
