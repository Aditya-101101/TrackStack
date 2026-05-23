import Incident from "../models/incident.model.js";
import Monitor from "../models/monitor.model.js";
import asyncHandler from "../utility/asyncHandler.js";
import ApiError from "../utility/ApiError.js";


export const getMonitorIncidents = asyncHandler(async (req, res) => {
    const monitor = await Monitor.findOne({
        _id: req.params.id,
        userId: req.user._id,
    });

    if (!monitor) {
        throw new ApiError(404, "Monitor not found");
    }

    const incidents = await Incident.find({
        monitorId: monitor._id,
        userId: req.user._id,
    }).populate("monitorId", "name url status")
        .populate("userId", "name email").sort({ startedAt: -1 });

    res.status(200).json({
        success: true,
        count: incidents.length,
        incidents,
    });
});

export const getAllIncidents = asyncHandler(async (req, res) => {
    const incidents = await Incident.find({
        userId: req.user._id,
    }).populate("monitorId", "name url status")
        .populate("userId", "name email").sort({ startedAt: -1 }).populate("");

    res.status(200).json({
        success: true,
        count: incidents.length,
        incidents,
    });
});

export const getOpenIncidents = asyncHandler(async (req, res) => {
    const incidents = await Incident.find({
        userId: req.user._id,
        status: "OPEN",
    }).populate("monitorId", "name url status")
        .populate("userId", "name email").sort({ startedAt: -1 });

    res.status(200).json({
        success: true,
        count: incidents.length,
        incidents,
    });
});