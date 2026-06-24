import Monitor from '../models/monitor.model.js'
import checkQueue from '../queues/check.queue.js'

const SCHEDULER_INTERVAL_MS = 60 * 1000;

let isSchedulerRunning = false;

const enqueueDueMonitors = async () => {
    if (isSchedulerRunning) {
        return;
    }

    isSchedulerRunning = true;

    try {
        const now = new Date();

        const dueMonitors = await Monitor.find({
            isActive: true,
            nextCheckAt: { $lte: now },
        }).limit(50);

        if (dueMonitors.length === 0) {
            return;
        }

        console.log(`Found ${dueMonitors.length} due monitor(s)`);

        for (const monitor of dueMonitors) {
            const job = await checkQueue.add(
                "scheduled-check",
                {
                    monitorId: monitor._id.toString(),
                    userId: monitor.userId.toString(),
                },
                {
                    attempts: 3,
                    backoff: {
                        type: "exponential",
                        delay: 2000,
                    },
                    removeOnComplete: true,
                    removeOnFail: 100,
                }
            );

            console.log(
                `Scheduled check queued for monitor: ${monitor.name}, jobId: ${job.id}`
            );
        }
    } catch (error) {
        console.log("Scheduler error:", error.message);
        console.log(error);
    } finally {
        isSchedulerRunning = false;
    }
};

enqueueDueMonitors();

setInterval(enqueueDueMonitors, SCHEDULER_INTERVAL_MS);

console.log("Monitor Scheduler running...");