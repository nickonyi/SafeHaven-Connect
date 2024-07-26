import Event from "./../models/Event.js";
import Ticket from "../models/Ticket.js";
import jwt from "jsonwebtoken"
import { multerUploads, dataUri,uploader, cloudinaryConfig } from '../middlewares/cloudinary.js';

export const creatEvent = async (req,res,next)=> {
  
   try {

    const token = req.cookies.accessToken;
    
    
    if(!token) return res.status(401).json('Not logged in!');
    jwt.verify(token,"secretkey",(err,userInfo)=> {
      
     multerUploads(req,res,async function (err){
         if(err){
          return res.status(400).json({
            status:"fail",
            message:"Error Uploading image"
          })
         }

         cloudinaryConfig();

         const { name, description, date, location, venue } = req.body;
         const eventDate = new Date(date);
         if(isNaN(eventDate) || eventDate <= Date.now()){
            return res.status(400).json({
              status: 'fail',
              message: 'Invalid event date. Please provide a future date.'
          });
         }

          let image = null;
          
          if(req.file){
            const imageDataUri = dataUri(req);
            const result = await uploader.upload(imageDataUri,{ folder: 'safehaven_event_images' });
            image = result.secure_url;
          }

          const event = await Event.create({
            name,
            description,
            date: eventDate,
            location,
            createdBy: userInfo.id,
            image,
            venue
        });

        res.status(201).json({
            status: "success",
            message: "Event created successfully",
            event
        });
         
     })
   });
  } catch (error) {
       next(error)
   }
  

}

export const updateEvents = async (req,res,next)=> {
    try {
      const token = req.cookies.accessToken;

    if(!token) return res.status(401).json('Not logged in!');
    jwt.verify(token,"secretkey",async (err,userInfo)=> {
      const userId = userInfo.id;
      const eventId = req.params.eventId;
      
      const event = await Event.findById(eventId);
      
      if (!event) {
        const error = new Error("CastError")
        error.statuscode = 204
        return next(error)
    }

       
    if (event.createdBy !== userId.toString()) {
      return res.status(403).json({
          status: "Error",
          message: "You're not authorized to update this Event.",
      });
  }

  const updatedEvent = await Event.findByIdAndUpdate(eventId,req.body,{
    new:true,
    runValidators:true
  })

  res.status(200).json({
            status: 'success',
            message: "Event updated successfully",
            event: updatedEvent
  })
    });
    } catch (error) {
        console.error('Error updating event:', error);
        next(error);
    }
}

export const deleteEvents = async (req,res,next)=> {
     try {
      const token = req.cookies.accessToken;

      if(!token) return res.status(401).json('Not logged in!');
      jwt.verify(token,"secretkey",async (err,userInfo)=> {
        const userId = userInfo.id;
        const eventId = req.params.eventId;

        const event = await Event.findById(eventId);

        if (event.createdBy !== userId.toString()) {
          return res.status(403).json({
              status: "Error",
              message: "You're not authorized to delete this Event."
          });
      }

      const deletedEvent = await Event.findByIdAndDelete(eventId);

      if(!deletedEvent){
            const error = new Error("CastError");
            error.statuscode = 204
            return next(error)
          }

          res.status(200).json ({
            status:"success",
            message: "Event successfully deleted",
          })
      
      });
     } catch (error) {
      console.error('Error deleting event:', error); 
      next(error);
     }
}

export const createTicket = async (req,res,next) => {
  try {
    const { eventId, userId, type, sit, price } = req.body;
    
    if (!['Regular', 'VIP'].includes(type)) {
      return res.status(400).json({
          status: "fail",
          message: "Invalid ticket type."
      });
  }

  const newTicket = new Ticket({
    eventId,
    userId,
    type,
    sit,
    price
});

await newTicket.save();

res.status(200).json({
            status: "success",
            message: `${type} ticket created successfully`,
            ticket: newTicket
});
    
  } catch (error) {
    next(error)
  }
}

export const getTicketforEvent = async (req,res,next)=> {
  try {
    const eventId = req.params.ticketId;
    console.log(eventId);

    const tickets = await Ticket.find({eventId});
    
    if (!tickets) {
      const error = new Error("CastError")
      error.statuscode = 204
      return next(error)
  }

  res.status(200).json({
      status: "success",
      message: "Tickets for the event fetched successfully",
      resulit: tickets.length,
      tickets
  });
    
  } catch (error) {
    console.log("Error in getting tickets",error);
    next(error)
  }
}

export const updateTicket = async (req,res,next)=> {
  try {
    const token = req.cookies.accessToken;

      if(!token) return res.status(401).json('Not logged in!');
      jwt.verify(token,"secretkey",async (err,userInfo)=> {
        const userId = userInfo.id;
        const ticketId = req.params.ticketId;
        const { sit, price } = req.body;

        const ticket = await Ticket.findById(ticketId);

        if (ticket.userId !== userId.toString()) {
            return res.status(403).json({
                status: "Error",
                message: "You're not authorized to update this ticket.",
            });
        }

        if (!ticket) {
          const error = new Error("CastError")
          error.statuscode = 204
          return next(error)
       }   

       ticket.sit = sit;
       ticket.price = price;

       const updatedTicket = await ticket.save();

  res.status(200).json({
            status: 'success',
            message: "Ticket updated successfully",
            ticket: updatedTicket
  })
});
  } catch (error) {
    console.error('Error updating ticket:', error);
    next(error);
  }
}


export const deleteTicket = async (req,res,next)=> {
  try {
    const token = req.cookies.accessToken;

    if(!token) return res.status(401).json('Not logged in!');
    jwt.verify(token,"secretkey",async (err,userInfo)=> {
      const userId = userInfo.id;
      const ticketId = req.params.ticketId;

      const ticket = await Ticket.findById(ticketId);

      if (ticket.userId !== userId.toString()) {
          return res.status(403).json({
              status: "Error",
              message: "You're not authorized to delete this ticket."
          });
      }

      const deletedTicket = await Ticket.findByIdAndDelete(ticketId);

      if(!deletedTicket){
            const error = new Error("CastError");
            error.statuscode = 204
            return next(error)
          }

          res.status(200).json ({
            status:"success",
            message: "Ticket successfully deleted",
          })
      
      });
  } catch (error) {
    console.error('Error deleting ticket:', error);
    next(error);
  }
} 