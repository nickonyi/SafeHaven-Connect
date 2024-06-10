import { db } from "./connect.js";
import jwt from "jsonwebtoken";


export const getLikes = (req,res)=> {
    const sql = "SELECT userId FROM likes WHERE postId = ?";

    db.query(sql,[req.query.postId],(err,data)=>{
        if(err){
            return res.status(500).json(err);
        }

        return res.status(200).json(data.map((like)=>like.userId));
    })
}


export const addLike = (req,res)=> {
    const token = req.cookies.accessToken;
    console.log(token);
    if(!token) return res.status(401).json('Not logged in!');
    jwt.verify(token,"secretkey",(err,userInfo)=> {
        if(err) return res.status(403).json('Invalid token!');

        const sql = "INSERT INTO likes (`userId`,`postId`) VALUES (?)";

        const values = [ 
           userInfo.id,
           req.body.postId 
        ]
    
        db.query(sql,[values],(err,data)=>{
            if(err){
                return res.status(500).json(err);
            }
    
            return res.status(200).json("Post has been liked!");
        })
    })
}

export const deleteLike = (req,res)=> {
    const token = req.cookies.accessToken;
    console.log(token);
    if(!token) return res.status(401).json('Not logged in!');
    jwt.verify(token,"secretkey",(err,userInfo)=> {
        if(err) return res.status(403).json('Invalid token!');

        const sql = "DELETE FROM likes WHERE userId = ? AND postId = ?";
    
        db.query(sql,[userInfo.id,req.params.postId],(err,data)=>{
            if(err){
                return res.status(500).json(err);
            }
    
            return res.status(200).json("Like has been deleted!");
        })
    })
}