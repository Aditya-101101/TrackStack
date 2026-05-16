import { Queue } from "bullmq";
import redisConnection from "../config/redis.js";

const testQueue = new Queue("test-queue", {
  connection: redisConnection,
});

export default testQueue;