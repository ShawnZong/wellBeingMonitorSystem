import { superoak } from "../../../deps.js";
import app from "../../../app.js";
import { getUserByEmail } from "../../../services/userService.js";

Deno.test({
  name: "check entries: /",
  async fn() {
    const testClient = await superoak(app);
    await testClient.get("/").expect(200);
  },
  sanitizeResources: false,
  sanitizeOps: false,
});
Deno.test({
  name: "check entries: /auth/registration",
  async fn() {
    const testClient = await superoak(app);
    await testClient.get("/auth/registration").expect(200);
  },
  sanitizeResources: false,
  sanitizeOps: false,
});
Deno.test({
  name: "check entries: /auth/login",
  async fn() {
    const testClient = await superoak(app);
    await testClient.get("/auth/login").expect(200);
  },
  sanitizeResources: false,
  sanitizeOps: false,
});

Deno.test({
  name: "register a new user POST /auth/registration",
  async fn() {
    const testClient = await superoak(app);
    await testClient.post("/auth/registration")
      .send("email=c%40gmail.com&password=1111&verification=1111")
      .expect(200);
  },
  sanitizeResources: false,
  sanitizeOps: false,
});
