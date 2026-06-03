const express = require("express");
const { checkDatabase } = require("../db");

const router = express.Router();
let requestCount = 0;

router.use((req, res, next) => {
  requestCount += 1;
  next();
});

router.get("/health", (req, res) => {
  res.json({
    status: "ok",
    service: "ops-ticket-api",
    environment: process.env.NODE_ENV || "development",
    uptimeSeconds: Math.round(process.uptime()),
  });
});

router.get("/ready", async (req, res) => {
  try {
    await checkDatabase();
    res.json({ status: "ready", database: "ok" });
  } catch (error) {
    res.status(503).json({
      status: "not_ready",
      database: "error",
      message: error.message,
    });
  }
});

router.get("/metrics", (req, res) => {
  const memory = process.memoryUsage();

  res.json({
    requests: requestCount,
    rssBytes: memory.rss,
    heapUsedBytes: memory.heapUsed,
  });
});

module.exports = router;
