import { Worker } from 'bullmq'
import redisConnection from '../config/redis.js'
import Monitor from '../models/monitor.model.js'
import Result from '../models/result.model.js'
import { performHttpCheck } from '../services/check.service.js'
import Incident from '../models/incident.model.js'

console.log("Check worker listening for jobs...");
const checkWorker = new Worker(
    'check-queue',
    async (job) => {
        console.log("Processing check job:", job.id, job.name);

        const { monitorId, userId } = job.data;

        const monitor = await Monitor.findOne({
            _id: monitorId,
            userId,
        });

        if (!monitor) {
            throw new Error("Monitor not found");
        }

        if (!monitor.isActive) {
            throw new Error("Monitor is paused");
        }

        const previousStatus = monitor.status;

        const result = await performHttpCheck(monitor);

        await Result.create({
            monitorId: monitor._id,
            userId: monitor.userId,
            status: result.status,
            statusCode: result.statusCode,
            responseTime: result.responseTime,
            errorMessage: result.errorMessage,
            checkedAt: new Date(),
        });

        try {
            if (result.status === "DOWN" && previousStatus !== "DOWN") {
                const existingOpenIncident = await Incident.findOne({
                    monitorId: monitor._id,
                    userId: monitor.userId,
                    status: "OPEN",
                });

                if (!existingOpenIncident) {
                    await Incident.create({
                        monitorId: monitor._id,
                        userId: monitor.userId,
                        status: "OPEN",
                        startedAt: new Date(),
                        reason:
                            result.errorMessage ||
                            (result.statusCode
                                ? `HTTP status ${result.statusCode}`
                                : "Monitor is down"),
                    });

                    console.log(`Incident opened for monitor: ${monitor.name}`);
                }
            }

            if (result.status === "UP" && previousStatus === "DOWN") {
                const openIncident = await Incident.findOne({
                    monitorId: monitor._id,
                    userId: monitor.userId,
                    status: "OPEN",
                });

                if (openIncident) {
                    openIncident.status = "RESOLVED";
                    openIncident.resolvedAt = new Date();
                    await openIncident.save();

                    console.log(`Incident resolved for monitor: ${monitor.name}`);
                }
            }
        } catch (error) {
            console.error("Incident logic error:", error.message);
            console.error(error);
        }

        monitor.status = result.status;
        monitor.lastCheckedAt = new Date();
        monitor.lastResponseTime = result.responseTime;
        monitor.nextCheckAt = new Date(Date.now() + monitor.interval * 1000);

        if (result.status === "UP") {
            monitor.consecutiveSuccesses += 1;
            monitor.consecutiveFailures = 0;
        }

        if (result.status === "DOWN") {
            monitor.consecutiveFailures += 1;
            monitor.consecutiveSuccesses = 0;
        }

        await monitor.save();

        console.log(`Monitor ${monitor.name} checked: ${result.status}`);
    },
    {
        connection: redisConnection,
    }
);

checkWorker.on("completed", (job) => {
    console.log("Check job completed:", job.id);
});

checkWorker.on("failed", (job, error) => {
    console.error("Check job failed:", job?.id, error.message);
    console.log(error)
});

export default checkWorker;