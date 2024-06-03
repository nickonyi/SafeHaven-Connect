import {db }from './connect.js';
import jwt from 'jsonwebtoken';

export const getPosts =  (req, res) => {
    const token = req.cookies.accessToken;
    if(!token) return res.status(401).json('Not logged in!');
    jwt.verify(token,"secretkey",(err,userInfo)=> {
        if(err) return res.status(403).json('Invalid token!');

        const sql = `SELECT p.*,u.id as userId,username,profilePic FROM posts As p JOIN users As u ON (u.id = p.userId)
        LEFT JOIN relationships as r ON(p.userId = r.followedUserId) WHERE r.followerUserId = ? OR p.userId = ?`;
    
        db.query(sql,[userInfo.id,userInfo.id],(err,data)=>{
            if(err){
                return res.status(500).json(err);
            }
    
            return res.status(200).json(data);
        })
    })

    
}; 