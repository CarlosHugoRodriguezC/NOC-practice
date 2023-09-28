import mongoose from "mongoose";
import { MongoDatabase } from "../init";
import { LogServerityLevel } from "../../../domain/entities/log.entity";
import { LogModel } from "./log.model";

describe("mongo/models/log.model.ts", () => {
  beforeEach(async () => {
    await MongoDatabase.connect({
      mongoUrl: process.env.MONGO_URI!,
      dbName: process.env.MONGO_DB_NAME!,
    });
  });

  afterEach(async () => {
    await mongoose.disconnect();
  });

  test("should return a log model", async () => {
    const logData = {
      origin: "log.model.test.ts",
      message: "test",
      level: LogServerityLevel.low,
    };

    const log = await LogModel.create(logData);

    expect(log).toEqual(
      expect.objectContaining({
        ...logData,
        id: expect.any(String),
        createdAt: expect.any(Date),
      })
    );

    await LogModel.findByIdAndDelete(log.id);
  });

  test("should return the schema object", async () => {
    const schema = LogModel.schema.obj;

    expect(schema).toEqual({
      message: { type: expect.any(Function), required: true },
      level: {
        type: expect.any(Function),
        enum: ["low", "medium", "high"],
        default: "low",
      },
      origin: { type: expect.any(Function) },
      createdAt: expect.any(Object),
    });
  });
});
