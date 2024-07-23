import express from "express";
import { creatEvent,updateEvents} from "../controller/events.js";

const router = express.Router();


router.post("/createEvent", creatEvent);
router.put("/:eventId", updateEvents);


export default router;