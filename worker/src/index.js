import dotenv from "dotenv";

const result = dotenv.config();

console.log("dotenv result:", result.error ? result.error.message : "loaded");
console.log("cwd:", process.cwd());
const { default: connectDB } = await import("./config/db.js");

await connectDB();

await import("./workers/test.worker.js");

console.log("Worker process running...");