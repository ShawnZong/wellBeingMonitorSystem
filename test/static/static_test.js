import { superoak } from "../../deps.js";
import app from "../../app.js";

Deno.test({
  name: "check request static file: /static/code.js",
  async fn() {
    const testClient = await superoak(app);
    await testClient.get("/static/code.js").expect(200);
  },
  sanitizeResources: false,
  sanitizeOps: false,
});
