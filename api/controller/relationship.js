import { db } from "./connect.js";
import jwt from "jsonwebtoken";


export const getRelationships = (req,res)=> {
    const sql = "SELECT followerUserId FROM relationships WHERE followedUserId = ?";
    console.log(req.query.followedUserId);

    db.query(sql,[req.query.followedUserId],(err,data)=>{
        if(err){
            return res.status(500).json(err);
        }

        return res.status(200).json(data.map((relationship)=>relationship.followerUserId));
    })
}


export const addRelationship = (req,res)=> {
    const token = req.cookies.accessToken;
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

export const deleteRelationship = (req,res)=> {    
    const token = req.cookies.accessToken;
    
    if(!token) return res.status(401).json('Not logged in!');
    jwt.verify(token,"secretkey",(err,userInfo)=> {
        if(err) return res.status(403).json('Invalid token!');

        const sql = "DELETE FROM likes WHERE `userId` = ? AND `postId` = ?";
        
         
        db.query(sql,[userInfo.id,req.query.postId],(err,data)=>{
            if(err){
                return res.status(500).json(err);
            }

            return res.status(200).json("Like has been deleted!");
        })
    })
}