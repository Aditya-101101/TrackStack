import { Worker } from "bullmq";
import redisConnection from "../config/redis.js";
import Monitor from "../models/monitor.model.js";
import Result from "../models/result.model.js";
import { performHttpCheck } from "../services/check.service.js";
import Incident from "../models/incident.model.js";
import { sendEmail } from "../utility/sendEmail.js";
import "../models/user.model.js";

console.log("Check worker listening for jobs...");

const checkWorker = new Worker(
  "check-queue",
  async (job) => {
    console.log("Processing check job:", job.id, job.name);

    const { monitorId, userId } = job.data;

    const monitor = await Monitor.findOne({
      _id: monitorId,
      userId,
    }).populate("userId", "email");

    if (!monitor) {
      throw new Error("Monitor not found");
    }

    if (!monitor.isActive) {
      throw new Error("Monitor is paused");
    }

    const ownerId = monitor.userId._id || monitor.userId;
    const ownerEmail = monitor.userId.email;

    const previousStatus = monitor.status;

    const result = await performHttpCheck(monitor);

    await Result.create({
      monitorId: monitor._id,
      userId: ownerId,
      status: result.status,
      statusCode: result.statusCode,
      responseTime: result.responseTime,
      errorMessage: result.errorMessage,
      checkedAt: new Date(),
    });

    try {
      const failures = monitor.consecutiveFailures + 1;

      if (result.status === "DOWN" && failures >= 3 && previousStatus === "DOWN") {
        const existingOpenIncident = await Incident.findOne({
          monitorId: monitor._id,
          userId: ownerId,
          status: "OPEN",
        });

        if (!existingOpenIncident) {
          const incident = await Incident.create({
            monitorId: monitor._id,
            userId: ownerId,
            status: "OPEN",
            startedAt: new Date(),
            reason:
              result.errorMessage ||
              (result.statusCode
                ? `HTTP status ${result.statusCode}`
                : "Monitor is down"),
          });

          console.log(`Incident opened for monitor: ${monitor.name}`);

          if (ownerEmail) {
            await sendEmail({
              to: ownerEmail,
              subject: `🚨 DOWN: ${monitor.name}`,
              html: `
  <div style="font-family: Arial, sans-serif; background-color: #f8fafc; padding: 24px;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e5e7eb;">
      
      <div style="background-color: #dc2626; color: #ffffff; padding: 20px 24px;">
        <h1 style="margin: 0; font-size: 22px;">Monitor Down Alert</h1>
        <p style="margin: 6px 0 0; font-size: 14px;">An uptime monitor has detected downtime.</p>
      </div>

      <div style="padding: 24px;">
        <p style="font-size: 16px; color: #111827; margin-top: 0;">
          <strong>${monitor.name}</strong> is currently <strong style="color: #dc2626;">DOWN</strong>.
        </p>

        <div style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 10px; padding: 16px; margin: 20px 0;">
          <p style="margin: 0 0 10px; color: #374151;">
            <strong>Monitor:</strong> ${monitor.name}
          </p>
          <p style="margin: 0 0 10px; color: #374151;">
            <strong>URL:</strong> 
            <a href="${monitor.url}" style="color: #2563eb; text-decoration: none;">${monitor.url}</a>
          </p>
          <p style="margin: 0 0 10px; color: #374151;">
            <strong>Reason:</strong> ${incident.reason}
          </p>
          <p style="margin: 0; color: #374151;">
            <strong>Started At:</strong> ${new Date(incident.startedAt).toLocaleString()}
          </p>
        </div>

        <p style="font-size: 14px; color: #4b5563;">
          This alert was sent because your monitor changed from a healthy state to a down state.
        </p>

        <div style="margin-top: 24px;">
          <a href="${monitor.url}" 
             style="display: inline-block; background-color: #dc2626; color: #ffffff; padding: 12px 18px; border-radius: 8px; text-decoration: none; font-size: 14px; font-weight: bold;">
            Open Monitored URL
          </a>
        </div>
      </div>

      <div style="background-color: #f9fafb; padding: 16px 24px; border-top: 1px solid #e5e7eb;">
        <p style="margin: 0; font-size: 12px; color: #6b7280;">
          TrackStack Uptime Monitoring · Automated alert
        </p>
      </div>
    </div>
  </div>
`,
            });

            console.log(`DOWN alert email sent to ${ownerEmail}`);
          }
        }
      }

      const successes = monitor.consecutiveSuccesses + 1;

      if (result.status === "UP" && successes >= 3 && previousStatus === "UP") {
        const openIncident = await Incident.findOne({
          monitorId: monitor._id,
          userId: ownerId,
          status: "OPEN",
        });

        if (openIncident) {
          openIncident.status = "RESOLVED";
          openIncident.resolvedAt = new Date();
          await openIncident.save();
          monitor.nextCheckAt = new Date(Date.now());

          console.log(`Incident resolved for monitor: ${monitor.name}`);

          if (ownerEmail) {
            await sendEmail({
              to: ownerEmail,
              subject: `✅ RECOVERED: ${monitor.name}`,
              html: `
  <div style="font-family: Arial, sans-serif; background-color: #f8fafc; padding: 24px;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e5e7eb;">
      
      <div style="background-color: #16a34a; color: #ffffff; padding: 20px 24px;">
        <h1 style="margin: 0; font-size: 22px;">Monitor Recovered</h1>
        <p style="margin: 6px 0 0; font-size: 14px;">Your monitor is back online.</p>
      </div>

      <div style="padding: 24px;">
        <p style="font-size: 16px; color: #111827; margin-top: 0;">
          <strong>${monitor.name}</strong> is now <strong style="color: #16a34a;">UP</strong>.
        </p>

        <div style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 10px; padding: 16px; margin: 20px 0;">
          <p style="margin: 0 0 10px; color: #374151;">
            <strong>Monitor:</strong> ${monitor.name}
          </p>
          <p style="margin: 0 0 10px; color: #374151;">
            <strong>URL:</strong> 
            <a href="${monitor.url}" style="color: #2563eb; text-decoration: none;">${monitor.url}</a>
          </p>
          <p style="margin: 0; color: #374151;">
            <strong>Resolved At:</strong> ${new Date(openIncident.resolvedAt).toLocaleString()}
          </p>
        </div>

        <p style="font-size: 14px; color: #4b5563;">
          This recovery alert was sent because your monitor changed from down to healthy.
        </p>

        <div style="margin-top: 24px;">
          <a href="${monitor.url}" 
             style="display: inline-block; background-color: #16a34a; color: #ffffff; padding: 12px 18px; border-radius: 8px; text-decoration: none; font-size: 14px; font-weight: bold;">
            Open Monitored URL
          </a>
        </div>
      </div>

      <div style="background-color: #f9fafb; padding: 16px 24px; border-top: 1px solid #e5e7eb;">
        <p style="margin: 0; font-size: 12px; color: #6b7280;">
          TrackStack Uptime Monitoring · Automated recovery alert
        </p>
      </div>
    </div>
  </div>
`,
            });

            console.log(`Recovery email sent to ${ownerEmail}`);
          }
        }
      }
    } catch (error) {
      console.error("Incident/email logic error:", error.message);
      console.error(error);
    }

    const update = {
      status: result.status,
      lastCheckedAt: new Date(),
      lastResponseTime: result.responseTime,
      nextCheckAt: new Date(
        Date.now() + monitor.interval * 1000
      ),
    };


    if (result.status === "UP") {
      update.consecutiveSuccesses =
        monitor.consecutiveSuccesses + 1;

      update.consecutiveFailures = 0;
    }


    if (result.status === "DOWN") {
      update.consecutiveFailures =
        monitor.consecutiveFailures + 1;

      update.consecutiveSuccesses = 0;
    }


    await Monitor.updateOne(
      {
        _id: monitor._id,
        userId,
      },
      {
        $set: update,
      }
    );

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
  console.log(error);
});

export default checkWorker;