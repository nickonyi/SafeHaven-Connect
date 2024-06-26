import express from "express";
import { getRelationships,addRelationship,deleteRelationship,getSuggestions,getFriends} from "../controller/relationship.js";


const router = express.Router();
router.get("/",getRelationships)
router.get("/friends/:userId",getFriends);
router.post("/",addRelationship)
router.delete("/",deleteRelationship)
router.get("/suggestions/:userId",getSuggestions)

export default router;