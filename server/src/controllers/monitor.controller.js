import Monitor from "../models/monitor.model.js";
import asyncHandler from "../utility/asyncHandler.js";
import ApiError from "../utility/ApiError.js";

export const createMonitor = asyncHandler(async (req, res) => {
  const { name, url, method, interval, timeout } = req.body;

  if (!name || !url)
    throw new ApiError(400, "Name and URL are required!")

  const monitor = await Monitor.create({
    userId: req.user._id,
    name,
    url,
    method: method || "GET",
    interval: interval || 300,
    timeout: timeout || 5000,
    nextCheckAt: new Date(),
  })


  res.status(201).json({
    success: true,
    message: "Monitor created successfully",
    monitor,
  })
})

export const getMonitor = asyncHandler(async (req, res) => {
  const monitors = await Monitor.find({ userId: req.user._id }).sort({ createdAt: -1 })

  res.status(200).json({
    success: true,
    count: monitors.length,
    monitors,
  })
})

export const getMonitorById = asyncHandler(async (req, res) => {
  const monitor = await Monitor.findOne({
    userId: req.user._id,
    _id: req.params.id,
  })

  if (!monitor)
    throw new ApiError(404, "Monitor not found")

  res.status(200).json({
    success: true,
    monitor,
  })
})

export const updateMonitor = asyncHandler(async (req, res) => {
  const allowedFields = ["name", "url", "method", "interval", "timeout"];

  const updates = {}

  allowedFields.forEach((field) => {
    if (req.body[field] !== undefined)
      updates[field] = req.body[field]
  })

  const monitor = await Monitor.findOneAndUpdate({
    _id: req.params.id,
    userId: req.user._id,
  },
    updates, {
    returnDocument: "after",
    runValidators: true
  })

  if (!monitor)
    throw new ApiError(404, "Monitor not found");


  res.status(200).json({
    success: true,
    message: "Monitor updated successfully",
    monitor,
  });
})

export const deleteMonitor = asyncHandler(async (req, res) => {
  const monitor = await Monitor.findOneAndDelete({
    _id: req.params.id,
    userId: req.user._id,
  });

  if (!monitor) {
    throw new ApiError(404, "Monitor not found");
  }

  res.status(200).json({
    success: true,
    message: "Monitor deleted successfully",
  });
})

export const pauseMonitor = asyncHandler(async (req, res) => {
  const monitor = await Monitor.findOneAndUpdate(
    {
      _id: req.params.id,
      userId: req.user._id,
    },
    {
      isActive: false,
      status: "PAUSED",
    },
    {
      returnDocument: "after",
      runValidators: true,
    }
  );

  if (!monitor) {
    throw new ApiError(404, "Monitor not found");
  }

  res.status(200).json({
    success: true,
    message: "Monitor paused successfully",
    monitor,
  });
});

export const resumeMonitor = asyncHandler(async (req, res) => {
  const monitor = await Monitor.findOneAndUpdate(
    {
      _id: req.params.id,
      userId: req.user._id,
    },
    {
      isActive: true,
      status: "UNKNOWN",
      nextCheckAt: new Date(),
    },
    {
      returnDocument: "after",
      runValidators: true,
    }
  );

  if (!monitor) {
    throw new ApiError(404, "Monitor not found");
  }

  res.status(200).json({
    success: true,
    message: "Monitor resumed successfully",
    monitor,
  });
});