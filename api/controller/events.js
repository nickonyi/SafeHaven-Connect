import Event from "./../models/Event.js";
import jwt from "jsonwebtoken"
import { multerUploads, dataUri,uploader, cloudinaryConfig } from '../middlewares/cloudinary.js';

export const creatEvent = async (req,res,next)=> {
  
   try {

    const token = req.cookies.accessToken;
    console.log(token);
    
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