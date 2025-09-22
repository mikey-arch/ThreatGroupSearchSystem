import ThreatGroup from "../models/ThreatGroup.ts"

export async function getAllThreatGroups(req, res) {
    try {
        const threatgroups = await ThreatGroup.find().sort({createdAt:-1})
        res.status(200).json(threatgroups)
    } catch (error) {
        console.error("Error in getAllThreatGroups controller", error)
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
