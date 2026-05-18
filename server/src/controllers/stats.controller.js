import Monitor from "../models/monitor.model.js";
import Result from "../models/result.model.js";
import ApiError from "../utility/ApiError.js";
import asyncHandler from "../utility/asyncHandler.js";
import Incident from "../models/incident.model.js";

export const getMonitorStats = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const monitorId = req.params.id;

    const monitor = await Monitor.findOne({
        _id: monitorId,
        userId,
    });

    if (!monitor) {
        throw new ApiError(404, "Monitor not found");
    }

    const totalChecks = await Result.countDocuments({
        monitorId,
        userId,
    });

    const upChecks = await Result.countDocuments({
        monitorId,
        userId,
        status: "UP",
    });

    const downChecks = await Result.countDocuments({
        monitorId,
        userId,
        status: "DOWN",
    });

    const totalIncidents = await Incident.countDocuments({
        monitorId,
        userId,
    });

    const openIncidents = await Incident.countDocuments({
        monitorId,
        userId,
        status: "OPEN",
    });

    const recentIncidents = await Incident.find({
        monitorId,
        userId,
    })
        .sort({ startedAt: -1 })
        .limit(5)
        .select("status reason startedAt resolvedAt createdAt");

    const uptimePercentage =
        totalChecks > 0 ? Number(((upChecks / totalChecks) * 100).toFixed(2)) : 0;

    const avgResult = await Result.aggregate([
        {
            $match: {
                monitorId: monitor._id,
                userId: userId,
                responseTime: { $ne: null },
            },
        },
        {
            $group: {
                _id: null,
                avgResponseTime: { $avg: "$responseTime" },
            },
        },
    ]);

    const avgResponseTime =
        avgResult.length > 0 ? Math.round(avgResult[0].avgResponseTime) : 0;

    const last24h = new Date(Date.now() - 24 * 60 * 60 * 1000);

    const last24hChecks = await Result.find({
        monitorId,
        userId,
        checkedAt: { $gte: last24h },
    })
        .sort({ checkedAt: 1 })
        .select("status statusCode responseTime errorMessage checkedAt");

    res.status(200).json({
        success: true,
        stats: {
            monitor: {
                id: monitor._id,
                name: monitor.name,
                url: monitor.url,
                status: monitor.status,
                lastCheckedAt: monitor.lastCheckedAt,
                lastResponseTime: monitor.lastResponseTime,
            },
            uptimePercentage,
            totalChecks,
            upChecks,
            downChecks,
            avgResponseTime,
            last24hChecks,
            totalIncidents,
            openIncidents,
            recentIncidents,
        },
    });
});