import { superoak } from "../../../deps.js";
import app from "../../../app.js";
import { getUserByEmail } from "../../../services/userService.js";

Deno.test({
  name: "check /api/summary",
  async fn() {
    const testClient = await superoak(app);
    await testClient.get("/api/summary")
      .expect(200);
  },
  sanitizeResources: false,
  sanitizeOps: false,
});
Deno.test({
  name: "check /api/summary/:year/:month/:day",
  async fn() {
    const testClient = await superoak(app);
    await testClient.get("/api/summary/2021/01/01")
      .expect(200);
  },
  sanitizeResources: false,
  sanitizeOps: false,
});
