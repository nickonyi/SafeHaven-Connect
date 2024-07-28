import { db } from "./connect.js";
import jwt from "jsonwebtoken";
import Event from "../models/Event.js";
import Ticket from "../models/Ticket.js";
import Registration from "../models/Registration.js";
import moment from "moment";

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
  try {
    const token = req.cookies.accessToken;

    if(!token) return res.status(401).json('Not logged in!');
    jwt.verify(token,"secretkey",async (err,userInfo)=> {
        if(err) return res.status(403).json('Invalid token!');

        const userId = userInfo.id.toString();
        

        const registrations = await Registration.find({ userId }).populate('eventId');
        
        if (!registrations || registrations.length === 0) {
            return res.status(200).json({
                message: 'No events registered by the user',
                events: []
            });
        }

        const events = registrations.map((registration) => {
            const eventDate = moment(registration.eventId.date);
            const today = moment();
            const daysUntilEvent = eventDate.diff(today,'days');

            return {
                eventName: registration.eventId.name,
                eventDate: eventDate.format('YYYY-MM-DD'),
                eventLocation: registration.eventId.location,
                eventVenue: registration.eventId.venue,
                eventCategory: registration.eventId.category,
                daysUntilEvent,
                registrationStatus: registration.status,
                numberOfSeats: registration.numberOfSeats,
                ticketPrice: registration.totalPrice,
                ticketType: registration.ticketType
            }
        });

        return res.status(200).json({
            message: 'User events fetched successfully',
            events
        })
    });
    
    
  } catch (error) {
    next(error);
  }

}

export const  userregisterforMyEvent = async (req,res,next)=> {
    try {
        const token = req.cookies.accessToken;
         

    if(!token) return res.status(401).json('Not logged in!');
    jwt.verify(token,"secretkey",async (err,userInfo)=> {
        if(err) return res.status(403).json('Invalid token!');

        const userId = userInfo.id;
        const eventId = req.params.eventId;

        

        const event = await Event.findById(eventId);
        
        if (!event) {
            return res.status(404).json({
                status: 'fail',
                message: 'Event not found'
            });
        }
        
        if (event.createdBy !== userId.toString()) {
            return res.status(403).json({
                status: 'fail',
                message: 'You are not authorized to view registrations for this event'
            });
        }
        
        const queryPromise = (sql, params) => {
            return new Promise((resolve, reject) => {
                db.query(sql, params, (err, data) => {
                    if (err) {
                        return reject(err);
                    }
                    resolve(data);
                });
            });
       };

       const registrations = await Registration.find({ eventId, userId: { $ne: userId } }).populate('ticketId');
        console.log(registrations);

        const userRegistrations = [];
         
        for (const registration of registrations) {
            const ticket = registration.ticketId;
            const sql = `SELECT * FROM users WHERE id = ?`;

            try {
                const data = await queryPromise(sql, [registration.userId]);
                const { password, confirmPassword, ...info } = data[0];
                userRegistrations.push({
                    username: info.username,
                    ticketType: registration.ticketType,
                    status: registration.status,
                    numberOfSeats: registration.numberOfSeats,
                    pricePaid: registration.totalPrice,
                    ticketPrice: ticket.price,
                });
            } catch (err) {
                console.error('Error querying the database:', err);
                return res.status(500).json({ message: 'Internal server error' });
            }
        }

        console.log(userRegistrations);
        res.status(200).json({ userRegistrations });

    });
    } catch (error) {
        next(error);
    }
}