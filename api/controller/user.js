import { db } from "./connect.js";
import jwt from "jsonwebtoken";
import Event from "../models/Event.js";
import Ticket from "../models/Ticket.js";
import Registration from "../models/Registration.js";

export const getUser = (req, res) => {
 const userId = req.params.userId;

    const sql = `SELECT * FROM users WHERE id = ?`;

    db.query(sql, [userId], (err, data) => {
        if (err) {
            return res.status(500).json(err);
        }

        
         const {password,confirmPassword, ...info} = data[0];
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

export const getUserEvents = async (req,res,next)=> {

  try {
    const token = req.cookies.accessToken;
    console.log(token);
   
    if(!token) return res.status(401).json('Not logged in!');
    jwt.verify(token,"secretkey",async (err,userInfo)=> {
        if(err) return res.status(403).json('Invalid token!');

        const userId = userInfo.id;
        const userEvents = await Event.find({ createdBy: userId });
        
        res.status(200).json({
            status: "success",
            message: "User's events fetched successfully",
            result: userEvents,
            events: userEvents
        });
    });
  } catch (error) {
    console.error('Error fetching user events:', error);
        next(error);
  }
}

export const registerforEvent = async (req,res)=> {
    const { userId, ticketId, eventId, email, numberOfSeats, ticketType } = req.body;
    
    const ticket = await Ticket.findById(ticketId);
        if (!ticket) {
            return res.status(404).json({
                message: 'Ticket not found'
            });
        }

        if (ticket.sit < numberOfSeats) {
            return res.status(400).json({
                message: 'Insufficient available seats'
            });
        }

        let totalPrice = 0;
        let status = 'pending';

        if(ticket.price === 0){
            status = 'completed';
            ticket.sit -= numberOfSeats;
            await ticket.save();
        }

        const registration = new Registration({
            ticketId,
            userId,
            email,
            numberOfSeats,
            ticketType,
            totalPrice,
            status,
            eventId,
        });
        await registration.save();

     

        return res.status(200).json({
            message: 'Registration successful',
            registration,
        });

}

export const getMyRegisterEvent = async (req,res,next)=> {
  const token = req.cookies.accessToken;
  console.log(token)

}