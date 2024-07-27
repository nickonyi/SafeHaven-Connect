import express from "express";
import { creatEvent,updateEvents,deleteEvents,createTicket,getTicketforEvent,updateTicket,deleteTicket,getallEvents} from "../controller/events.js";

const router = express.Router();


router.post("/createEvent", creatEvent);
router.get("/getAllEvents", getallEvents);
router.put("/:eventId", updateEvents);
router.delete("/:eventId",deleteEvents);
router.post("/createTicket", createTicket);
router.get("/getTicket/:ticketId", getTicketforEvent); 
router.put("/updateTicket/:ticketId", updateTicket)
router.delete("/deleteTicket/:ticketId",  deleteTicket)


export default router;