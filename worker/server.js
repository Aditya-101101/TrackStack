import express from "express";
import "./src/index.js";

const app = express();

app.get("/", (_, res) => {
  res.send("TrackStack Worker Running");
});

const PORT = process.env.PORT || 3000; 

app.listen(PORT, () => {
  console.log(
    `Worker server running on port ${PORT}`
  );
});