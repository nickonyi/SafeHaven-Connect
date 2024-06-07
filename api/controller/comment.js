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

export const addComment =  (req, res) => {
    const token = req.cookies.accessToken;
    console.log(token);
    if(!token) return res.status(401).json('Not logged in!');
    jwt.verify(token,"secretkey",(err,userInfo)=> {
        if(err) return res.status(403).json('Invalid token!');

        const sql = "INSERT INTO comments (`desc`,`createdAt`,`userId`,`postId`) VALUES (?)";

        const values = [
           req.body.desc,
           moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),  
           userInfo.id,
           req.body.postId 
        ]
    
        db.query(sql,[values],(err,data)=>{
            if(err){
                return res.status(500).json(err);
            }
    
            return res.status(200).json("Commented added!");
        })
    })
};