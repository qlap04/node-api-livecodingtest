const express = require("express");
const { getPool } = require("../db");

const router = express.Router();

router.get("/tickets", async (req, res) => {
  try {
    const result = await getPool().query(
      "SELECT id, title, priority, status, created_at FROM tickets ORDER BY id ASC LIMIT 50"
    );

    res.json({
      count: result.rowCount,
      tickets: result.rows,
    });
  } catch (error) {
    res.status(500).json({
      error: "failed_to_load_tickets",
      message: error.message,
    });
  }
});

module.exports = router;
