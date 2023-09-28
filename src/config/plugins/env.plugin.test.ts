import { envs } from "./env.plugin";

describe("env.plugin.ts", () => {
  test("should return options", () => {
    expect(envs).toEqual({
      PORT: 3001,
      MAILER_SERVICE: "gmail",
      MAILER_EMAIL: "allenwalker123.hr@gmail.com",
      MAILER_SECRET_KEY: "mqpacbitnyhddqou",
      MONGO_URI: "mongodb://cahuroca:passgood@localhost:27017",
      MONGO_DB_NAME: "NOC-TEST",
      MONGO_USER: "cahuroca",
      MONGO_PASSWORD: "passgood",
      POSTGRES_URL: "postgresql://cahuroca:passgood@localhost:5432/NOC-TEST",
      POSTGRES_DB: "NOC-TEST",
      POSTGRES_USER: "cahuroca",
      POSTGRES_PASSWORD: "passgood",
      PROD: false,
    });
  });

  test("should return error if not found env", async () => {
    jest.resetModules();
    process.env.PORT = "a";
    try {
      await import("./env.plugin");
      expect(true).toBe(false);
    } catch (error) {
      expect(`${error}`).toContain('"PORT" should be a valid integer');
    }
  });
});
