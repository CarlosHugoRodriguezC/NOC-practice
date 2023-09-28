import mongoose from "mongoose";
import { MongoDatabase } from "./init";

describe("mongo/init.ts", () => {
  afterEach(async () => {
    await mongoose.connection.close();
  });

  test("should connect to mongodb", async () => {
    const connected = await MongoDatabase.connect({
      mongoUrl: process.env.MONGO_URI!,
      dbName: process.env.MONGO_DB_NAME!,
    });

    expect(connected).toBe(true);
    // await MongoDatabase.disconnect();
  });

  test("should return an error", async () => {
    try {
      await MongoDatabase.connect({
        mongoUrl: "mongodbs://test:123123123@localhosttest:27017",
        dbName: "NOC-TEST1",
      });
      expect(true).toBe(false);
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
});
