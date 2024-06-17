import { db } from "./connect.js";
import jwt from "jsonwebtoken";
import { isUserOnline } from "./utils.js";


export const getOnlineUsers =(req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

 

    const sql = `
        SELECT u.id, u.username,u.profilePic
        FROM safehaven.users as u
        JOIN safehaven.relationships r ON u.id = r.followedUserId
        WHERE r.followerUserId = ? AND u.is_online = 1
      `;

    db.query(sql, [userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data);
    });
  });
};