import {db }from './connect.js';
import jwt from 'jsonwebtoken';
import Blog from '../models/Blog.js';
import moment from 'moment';

export const addPost =  (req, res) => {
    const token = req.cookies.accessToken;
    
    if(!token) return res.status(401).json('Not logged in!');
    jwt.verify(token,"secretkey",(err,userInfo)=> {
        if(err) return res.status(403).json('Invalid token!');

        const sql = "INSERT INTO posts (`desc`,`img`,`createdAt`,`userId`) VALUES (?)";

        const values = [
           req.body.desc,
           req.body.img,
           moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),  
           userInfo.id 
        ]
    
        db.query(sql,[values],(err,data)=>{
            if(err){
                return res.status(500).json(err);
            }
    
            return res.status(200).json("Post added!");
        })
    })
};

export const getPosts =  (req, res) => {
    const userId = req.query.userId;
    const token = req.cookies.accessToken;
    
    if(!token) return res.status(401).json('Not logged in!');
    jwt.verify(token,"secretkey",(err,userInfo)=> {
        if(err) return res.status(403).json('Invalid token!');

        const sql = userId !== "undefined"? `SELECT p.*,u.id as userId,username,profilePic FROM posts As p JOIN users As u ON (u.id = p.userId)  WHERE p.userId=?`:`SELECT p.*,u.id as userId,username,profilePic FROM posts As p JOIN users As u ON (u.id = p.userId)
        LEFT JOIN relationships as r ON(p.userId = r.followedUserId) WHERE r.followerUserId = ? OR p.userId = ? ORDER BY p.createdAt DESC`;
    
        
        const values = userId !== "undefined"? [userId]:[userInfo.id,userInfo.id];

        db.query(sql,values,(err,data)=>{
            if(err){
                return res.status(500).json(err);
            }
    
            return res.status(200).json(data);
        })
    })

    
}; 

export const deletePost =  (req, res) => {
    const token = req.cookies.accessToken;
    
    if(!token) return res.status(401).json('Not logged in!');
    jwt.verify(token,"secretkey",(err,userInfo)=> {
        if(err) return res.status(403).json('Invalid token!');

        const sql = "DELETE FROM posts WHERE `id` = ? AND `userId` = ?";
        
    
        db.query(sql,[req.params.id,userInfo.id],(err,data)=>{
            if(err){
                return res.status(500).json(err);
            }
            
            if(data.affectedRows > 0) return res.status(200).json("Post has been deleted!")
            return res.status(403).json("You can delete only your post!");
        })
    })
};

export const addBlog = (req,res,next) => {
    try {
        const token = req.cookies.accessToken;
    
    if(!token) return res.status(401).json('Not logged in!');
    jwt.verify(token,"secretkey",async (err,userInfo)=> {
        if(err) return res.status(403).json('Invalid token!');
         const  {title,summary,author,content,imgURL} = req.body;
         console.log(author);
         
         const postDoc = await Blog.create({
            title,
            summary,
            content,
            author,
            img:imgURL,
         });

         res.status(200).json(
            {
            success:"Blog added successfully!",
            postDoc

            }
        );
    });
    } catch (error) {
        console.log(error);
        next(error);
        
    }
}