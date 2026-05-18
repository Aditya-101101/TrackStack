import Monitor from "../models/monitor.model.js";
import Result from '../models/result.model.js'
import Incident from "../models/incident.model.js";
import asyncHandler from "../utility/asyncHandler.js";


export const getDashboardSummary = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const totalMonitors = await Monitor.countDocuments({ userId });

  const upMonitors = await Monitor.countDocuments({
    userId,
    status: "UP",
    isActive: true,
  });

  const downMonitors = await Monitor.countDocuments({
    userId,
    status: "DOWN",
    isActive: true,
  });

  const pausedMonitors = await Monitor.countDocuments({
    userId,
    isActive: false,
  });

  const unknownMonitors = await Monitor.countDocuments({
    userId,
    status: "UNKNOWN",
    isActive: true,
  });

  const openIncidents = await Incident.countDocuments({
    userId,
    status: "OPEN",
  });

  const totalChecks = await Result.countDocuments({ userId });

  const upChecks = await Result.countDocuments({
    userId,
    status: "UP",
  });

  const overallUptimePercentage =
    totalChecks > 0 ? Number(((upChecks / totalChecks) * 100).toFixed(2)) : 0;

  const avgResult = await Result.aggregate([
    {
      $match: {
        userId,
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

  const recentChecks = await Result.find({ userId })
    .sort({ checkedAt: -1 })
    .limit(10)
    .populate("monitorId", "name url")
    .select("monitorId status statusCode responseTime errorMessage checkedAt");

  const recentIncidents = await Incident.find({ userId })
    .sort({ startedAt: -1 })
    .limit(5)
    .populate("monitorId", "name url")
    .select("monitorId status reason startedAt resolvedAt");

  const downMonitorList = await Monitor.find({
    userId,
    status: "DOWN",
    isActive: true,
  })
    .sort({ lastCheckedAt: -1 })
    .limit(5)
    .select("name url status lastCheckedAt lastResponseTime");

  const slowestMonitors = await Monitor.find({
    userId,
    isActive: true,
    lastResponseTime: { $ne: null },
  })
    .sort({ lastResponseTime: -1 })
    .limit(5)
    .select("name url status lastResponseTime lastCheckedAt");

  res.status(200).json({
    success: true,
    summary: {
      totalMonitors,
      upMonitors,
      downMonitors,
      pausedMonitors,
      unknownMonitors,
      openIncidents,
      avgResponseTime,
      overallUptimePercentage,
      recentChecks,
      recentIncidents,
      downMonitorList,
      slowestMonitors,
    },
  });
});