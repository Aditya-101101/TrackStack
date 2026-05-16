import Monitor from "../models/monitor.model.js";
import Result from "../models/result.model.js";
import asyncHandler from "../utility/asyncHandler.js";
import ApiError from "../utility/ApiError.js";

export const getMonitorResult = asyncHandler(async (req, res) => {
    const monitor = await Monitor.findOne({
        _id: req.params.id,
        userId: req.user._id
    })

    if (!monitor)
        throw new ApiError(404, "Monitor not found")

    const results = await Result.find({
        monitorId: monitor._id,
        userId: req.user._id,
    }).sort({ checkedAt: -1 }).limit(50)


    res.status(200).json({
        success: true,
        count: results.length,
        results,
    });

})

export const getLatestMonitorResult = asyncHandler(async (req, res) => {
    const monitor = await Monitor.findOne({
        _id: req.params.id,
        userId: req.user._id,
    })

    if (!monitor)
        throw new ApiError(404, "Monitor not found")


    const result = await Result.findOne({
        monitorId: monitor._id,
        userId: req.user._id,
    }).sort({ checkedAt: -1 })

    res.status(200).json({
        success: true,
        result,
    })
})