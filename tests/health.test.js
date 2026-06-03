const assert = require("node:assert");
const test = require("node:test");
const request = require("supertest");
const { createApp } = require("../src/server");

test("GET /health returns ok without requiring a database", async () => {
  const response = await request(createApp()).get("/health").expect(200);

  assert.equal(response.body.status, "ok");
  assert.equal(response.body.service, "ops-ticket-api");
});

test("unknown routes return not_found", async () => {
  const response = await request(createApp()).get("/missing").expect(404);

  assert.equal(response.body.error, "not_found");
});
