import { db } from "./connect.js";
import jwt from "jsonwebtoken";
import moment from "moment";

export const updateLastActive = (req, res, next) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");
  
    jwt.verify(token, "secretkey", (err, userInfo) => {
      if (err) return res.status(403).json("Token is not valid!")
        const query = 'UPDATE users SET last_active = NOW() WHERE id = ?';
        console.log(userInfo.id);
      
        db.query(query, [userInfo.id], (err) => {
          if (err) throw err;
          next();
        });
      
    });
  };
  
const ONLINE_THRESHOLD = 5 * 60 * 1000; // 5 minutes in milliseconds

const isUserOnline = (lastActive) => {
  const lastActiveTime = new Date(lastActive).getTime();
  const currentTime = new Date().getTime();
  return currentTime - lastActiveTime <= ONLINE_THRESHOLD;
};

export const getOnlineUsers = (req, res) => {
    const query = 'SELECT id, username, last_active FROM users';
  
    db.query(query, (err, results) => {
      if (err) return res.status(500).json(err);
  
      const onlineUsers = results.filter(user => isUserOnline(user.last_active));
      res.status(200).json(onlineUsers);
    });
};