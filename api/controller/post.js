import {db }from './connect.js';

export const getPosts =  (req, res) => {
    const sql = `SELECT p.*,u.id as userId,username,profilePic FROM posts As p JOIN users As u ON (u.id = p.userId)`;

    db.query(sql,(err,data)=>{
        if(err){
            return res.status(500).json(err);
        }

        return res.status(200).json(data);
    })
}; 