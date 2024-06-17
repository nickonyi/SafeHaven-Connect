import { createServer } from 'http';
import { Server } from 'socket.io';
import { isUserOnline, ONLINE_THRESHOLD } from './utils.js'; 
import {db }from './connect.js';

const setupSocket = (app) => {
  const server = createServer(app);
  const io = new Server(server);

  io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });

    socket.on('subscribeToOnlineUsers', (userId) => {
      console.log(userId);
      const query = `
        SELECT u.id, u.username, u.last_active
        FROM users u
        JOIN relationships r ON u.id = r.followedUserId
        WHERE r.followerUserId = ?
      `;

      setInterval(() => {
        db.query(query, [userId], (err, results) => {
          if (err) throw err;

          const onlineUsers = results.filter(user => isUserOnline(user.last_active));
          socket.emit('onlineUsers', onlineUsers);
        });
      }, ONLINE_THRESHOLD);
    });
  });

  return server;
};

export default setupSocket;
