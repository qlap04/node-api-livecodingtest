const { checkDatabase } = require("../src/db");

async function main() {
  await checkDatabase();
  console.log("Database readiness check passed");
}

main().catch((error) => {
  console.error(`Database readiness check failed: ${error.message}`);
  process.exitCode = 1;
});
