import express from "express"
import { searchThreatGroups, getThreatGroupByCanonicalName , getThreatGroupById} from "../controllers/controller.ts";

const router = express.Router();

router.get("/search", searchThreatGroups);
router.get("/:canonicalName", getThreatGroupByCanonicalName);
router.get("/:group_id", getThreatGroupById);

export default router;




