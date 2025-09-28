import ThreatGroup from "../models/ThreatGroup.ts"

export async function getThreatGroupByCanonicalName(req, res) {
    try {
        const { canonicalName } = req.params;
        const threatGroup = await ThreatGroup.findOne({ canonicalName });
        if(!threatGroup) return res.status(404).json({ message:"Threat group not found"});
        res.status(200).json(threatGroup);
    } catch (error) {
        console.error("Error in getThreatGroupByCanonicalName controller", error)
        res.status(500).json({message:"Internal server error"})
    }
}

export async function getThreatGroupById(req, res) {
    try {
        const threatgroup = await ThreatGroup.findById(req.params.id)
        if(!threatgroup) return res.status(404).json({message:"Threat Group not found"})
        res.json(threatgroup);
    } catch (error) {
        console.error("Error in getThreatGroupById controller", error)
        res.status(500).json({message:"Internal server error"})
    }
}
