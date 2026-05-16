import Monitor from "../models/monitor.model.js";
import checkQueue from "../queues/check.queue.js";
import asyncHandler from "../utility/asyncHandler.js";
import ApiError from "../utility/ApiError.js";

export const runManualCheck = asyncHandler(async (req, res) => {
    const monitor = await Monitor.findOne({
        _id: req.params.id,
        userId: req.user._id
    })

    if (!monitor)
        throw new ApiError(404, "Monitor not found")

    if (!monitor.isActive)
        throw new ApiError(400, "Cannot check a paused monitor")

    const job = await checkQueue.add("manual-check", {
        monitorId: monitor._id.toString(),
        userId: req.user._id.toString(),
    })

    res.status(202).json({
        success: true,
        message: "Manual check job added",
        jobId: job.id,
    })

})