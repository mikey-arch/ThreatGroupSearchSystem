import ThreatGroup from "../models/ThreatGroup.ts"

// Search for matches in canonicalName or aliases
export async function searchThreatGroups(req, res) {
    try {
        const { query } = req.query;
        if (!query) return res.status(400).json({ message: "Search query is required" });

        const threatGroups = await ThreatGroup.find({
            $or: [
                { canonicalName: { $regex: query, $options: 'i' } },
                { 'aliases.name': { $regex: query, $options: 'i' } }
            ]
        }).limit(20);

        res.status(200).json(threatGroups);
    } catch (error) {
        console.error("Error in searchThreatGroups controller", error)
        res.status(500).json({ message: "Internal server error" })
    }
}

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
