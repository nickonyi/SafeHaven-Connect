import { db } from "./connect.js";
import jwt from "jsonwebtoken";

export const getUser = (req, res) => {
 const userId = req.params.userId;

    const sql = `SELECT * FROM users WHERE id = ?`;

    db.query(sql, [userId], (err, data) => {
        if (err) {
            return res.status(500).json(err);
        }
         const {password, ...info} = data[0];
        return res.status(200).json(info);
    })
}

export const updateUser = (req,res)=> {
    const token = req.cookies.accessToken;
   
    if(!token) return res.status(401).json('Not logged in!');
    jwt.verify(token,"secretkey",(err,userInfo)=> {
        if(err) return res.status(403).json('Invalid token!');

        const sql = "UPDATE users SET `username` = ?, `email` = ?,  `coverPic` = ?,`profilePic` = ?, `city` = ? WHERE `id` = ?";

        const values = [ 
           req.body.username,
           req.body.email,
           req.body.coverPic,
           req.body.profilePic,
           req.body.city,
           userInfo.id
        ]

        
    
        db.query(sql,values,(err,data)=>{
            if(err){
                return res.status(500).json(err);
            }
             
            if(data.affectedRows > 0)return res.status(200).json("Updated!");
            return res.status(404).json("Update only your post!");
        })
    })
}