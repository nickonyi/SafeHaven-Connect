import express from "express";
import { getRelationships,addRelationship,deleteRelationship,getSuggestions} from "../controller/relationship.js";


const router = express.Router();
router.get("/",getRelationships)
router.post("/",addRelationship)
router.delete("/",deleteRelationship)
router.get("/suggestions/:userId",getSuggestions)

export default router;