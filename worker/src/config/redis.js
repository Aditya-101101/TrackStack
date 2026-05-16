import IORedis from "ioredis";

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