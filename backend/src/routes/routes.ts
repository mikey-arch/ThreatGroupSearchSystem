import express from "express"
import { searchThreatGroups, getThreatGroupByCanonicalName, getThreatGroupById, getAllThreatGroups} from "../controllers/controller.ts";

const router = express.Router();

router.get("/", getAllThreatGroups); 
router.get("/id/:id", getThreatGroupById);
router.get("/search", searchThreatGroups);
router.get("/:canonicalName", getThreatGroupByCanonicalName);

export default router;




