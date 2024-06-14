import { db } from "./connect.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken";

export const register = (req,res)=>{
   //check if the user exixts
   const sql = 'SELECT * FROM users WHERE username = ?';
 
   db.query(sql,[req.body.username],(err,result) => {
         if(err) {
              return res.status(500).json({message:err});
         }
         if(result.length > 0) {
             return res.status(400).json({message:"User already exists"});
         }

         //creater new user
   //hash the password
   const salt = bcrypt.genSaltSync(10);
   const hashedPassword = bcrypt.hashSync(req.body.password,salt);
   const hashedConfirmPassword = bcrypt.hashSync(req.body.confirmPassword,salt);

   const sql = 'INSERT INTO users (username,email,password,confirmPassword) VALUES (?)';

   const values = [
       req.body.username,
       req.body.email,
       hashedPassword,
       hashedConfirmPassword
   ];
   

   db.query(sql,[values],(err,result)=>{
         if(err) {
              return res.status(500).json({message:err});
         }
         return res.status(200).json({message:"User has been created"});
   })
   
});
}


export const login = (req,res)=> {
    const sql = 'SELECT * FROM users WHERE username = ?';
    db.query(sql,[req.body.username],(err,result)=>{
        if(err){
            return res.status(500).json(err);
        }
        if(result.length === 0){
            return res.status(400).json('User not found!!');
        }

        const checkPassword = bcrypt.compareSync(req.body.password,result[0].password);

        if(!checkPassword){
            return res.status(400).json('Wrong password or username!!');
        }

        const token = jwt.sign({id:result[0].id},'secretkey');

        const {password,confirmPassword, ...other} = result[0];
         res.
         cookie('accessToken',token,{
            httpOnly:true,
         }).
         status(200).
         json(other);

    });
}
export const logout = (req,res)=>{
    res.clearCookie('accessToken',{
        secure:true,
        sameSite:'none',
    }).status(200).json('User has been logged out');
}

