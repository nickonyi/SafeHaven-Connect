import { db } from "./connect.js"
import bcrypt from "bcryptjs"

export const register = (req,res)=>{
   //check if the user exixts
   const sql = 'SELECT * FROM users WHERE username = ?';
   db.query(sql,[req.body.username],(err,result => {
         if(err) {
              res.status(500).json({message:err});
         }
         if(result.length > 0) {
              res.status(400).json({message:"User already exists"});
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
   }));

   db.query(sql,[values],(err,result)=>{
         if(err) {
              res.status(500).json({message:err});
         }
         res.status(200).json({message:"User has been registered"});
   })
   
}


export const login = (req,res)=> {}
export const logout = (req,res)=>{}

