import express from "express";
import { creatEvent,updateEvents,deleteEvents,createTicket,getTicketforEvent,updateTicket} from "../controller/events.js";

const router = express.Router();


router.post("/createEvent", creatEvent);
router.put("/:eventId", updateEvents);
router.delete("/:eventId",deleteEvents);
router.post("/createTicket", createTicket);
router.get("/getTicket/:ticketId", getTicketforEvent); 
router.put("/updateTicket/:ticketId", updateTicket)


export default router;