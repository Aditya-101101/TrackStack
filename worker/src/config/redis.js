import IORedis from "ioredis";

if (!process.env.REDIS_URL) {
  throw new Error("REDIS_URL is missing in .env");
}

const redisConnection = new IORedis(process.env.REDIS_URL, {
  maxRetriesPerRequest: null,
});

redisConnection.on("connect", () => {
  console.log("Worker Redis connected");
});

redisConnection.on("error", (error) => {
  console.error("Worker Redis error:", error.message);
});

export default redisConnection;