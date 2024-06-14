import { db } from "./connect.js";
import jwt from "jsonwebtoken";


export const getRelationships = (req,res)=> {
    const sql = "SELECT followerUserId FROM relationships WHERE followedUserId = ?";
    

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

        const sql = "INSERT INTO relationships (`followerUserId`,`followedUserId`) VALUES (?)";

        const values = [ 
           userInfo.id,
           req.body.userId 
        ]

       
    
        db.query(sql,[values],(err,data)=>{
            if(err){
                return res.status(500).json(err);
            }
    
            return res.status(200).json("Following!");
        })
    })
}

export const deleteRelationship = (req,res)=> {    
    const token = req.cookies.accessToken;
    
    if(!token) return res.status(401).json('Not logged in!');
    jwt.verify(token,"secretkey",(err,userInfo)=> {
        if(err) return res.status(403).json('Invalid token!');

        const sql = "DELETE FROM relationships WHERE `followerUserId` = ? AND `followedUserId` = ?";
        
         
        db.query(sql,[userInfo.id,req.query.userId],(err,data)=>{
            if(err){
                return res.status(500).json(err);
            }

            return res.status(200).json("unfollow!");
        })
    })
}

export const getSuggestions = (req,res)=> {
    

    const userId = req.params.userId;

  // Example query to find users with mutual connections
  const sql = `
    SELECT u.id, u.username, u.city,u.profilePic, u.coverPic
    FROM users u
    WHERE u.id != ? AND u.id NOT IN (SELECT followedUserId FROM relationships WHERE followerUserId = ?)
    ORDER BY RAND() LIMIT 5;
  `;

  db.query(sql, [userId, userId], (err, results) => {
    if (err) return res.status(500).json(err);
    res.status(200).json(results);
  });

    
}
