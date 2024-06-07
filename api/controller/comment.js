import { db } from "./connect.js";

export const getComments = (req,res)=> {
    

        const sql = `SELECT c.*,u.id as userId,username,profilePic FROM comments As c JOIN users As u ON (u.id = c.userId)
        WHERE c.postId = ? ORDER BY c.createdAt DESC`;
    
        db.query(sql,[req.query.postId],(err,data)=>{
            if(err){
                return res.status(500).json(err);
            }
    
            return res.status(200).json(data);
        })
}