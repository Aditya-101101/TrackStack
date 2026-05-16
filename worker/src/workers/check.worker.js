import { Worker } from 'bullmq'
import redisConnection from '../config/redis.js'
import Monitor from '../models/monitor.model.js'
import Result from '../models/result.model.js'
import { performHttpCheck } from '../services/check.service.js'


const checkWorker = new Worker("check-queue", async (job) => {
    console.log("Processing check job:", job.id, job.name);

    const { monitorId, userId } = job.data
    const monitor = await Monitor.findOne({
        _id: monitorId,
        userId,
    })
    if (!monitor)
        throw new Error("Monitor not found")

    if (!monitor.isActive)
        throw new Error("Monitor is paused")

    const result = await performHttpCheck(monitor)

    await Result.create({
        monitorId: monitor._id,
        userId: monitor.userId,
        status: result.status,
        statusCode: result.statusCode,
        responseTime: result.responseTime,
        errorMessage: result.errorMessage,
        checkedAt: new Date(),
    })

    if (result.status === "UP") {
        monitor.status = "UP";
        monitor.consecutiveSuccesses += 1;
        monitor.consecutiveFailures = 0;
    } else {
        monitor.status = "DOWN";
        monitor.consecutiveFailures += 1;
        monitor.consecutiveSuccesses = 0;
    }

    monitor.lastCheckedAt = new Date()
    monitor.lastResponseTime = result.responseTime

    monitor.nextCheckAt = new Date(Date.now() + monitor.interval * 1000)

    await monitor.save()

    console.log(`Monitor ${monitor.name} checked: ${result.status}`);

    return {
        monitorId: monitor._id.toString(),
        status: result.status,
        responseTime: result.responseTime,
    }
}, { connection: redisConnection })

checkWorker.on("completed", (job) => {
    console.log("Check job completed:", job.id);
});

checkWorker.on("failed", (job, error) => {
    console.error("Check job failed:", job?.id, error.message);
});

export default checkWorker;