const express = require("express");
const healthRoutes = require("./routes/health");
const ticketRoutes = require("./routes/tickets");

function createApp() {
  const app = express();

  app.use(express.json());
  app.use(healthRoutes);
  app.use(ticketRoutes);

  app.use((req, res) => {
    res.status(404).json({ error: "not_found" });
  });

  return app;
}

if (require.main === module) {
  const app = createApp();
  const port = Number(process.env.PORT || 3000);
  const host = process.env.HOST || "127.0.0.1";

  app.listen(port, host, () => {
    console.log(`ops-ticket-api listening on http://${host}:${port}`);
  });
}

module.exports = {
  createApp,
};
