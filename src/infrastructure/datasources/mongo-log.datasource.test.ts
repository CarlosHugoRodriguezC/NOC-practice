import { envs } from "../../config/plugins/env.plugin";
import { LogModel, MongoDatabase } from "../../data/mongo";
import mongoose from "mongoose";
import { MongoLogDatasource } from "./mongo-log.datasource";
import { LogEntity, LogServerityLevel } from "../../domain/entities/log.entity";

describe("domain/use-cases/email/send-email-logs.test.ts", () => {
  beforeAll(async () => {
    const isConnected = await MongoDatabase.connect({
      dbName: envs.MONGO_DB_NAME,
      mongoUrl: envs.MONGO_URI,
    });
  });

  afterAll(async () => {
    await setTimeout(async () => {
      await mongoose.connection.close();
    }, 1000);
  });

  afterEach(async () => {
    await LogModel.deleteMany({});
  });

  test("should create a log", async () => {
    const logDatasource = new MongoLogDatasource();

    const logSpy = jest.spyOn(console, "log");

    const log = new LogEntity({
      level: LogServerityLevel.low,
      message: "Email sent",
      origin:
        "/home/allenwalker/workspaces/learning/node/05-NOC/src/domain/use-cases/email/send-email-logs.ts",
    });

    await logDatasource.saveLog(log);

    expect(logSpy).toHaveBeenCalled();
    expect(logSpy).toHaveBeenCalledWith("New log created: ", expect.anything());
  });

  test("should get logs", async () => {
    const logDatasource = new MongoLogDatasource();

    const log = new LogEntity({
      level: LogServerityLevel.low,
      message: "Email sent",
      origin:
        "/home/allenwalker/workspaces/learning/node/05-NOC/src/domain/use-cases/email/send-email-logs.ts",
    });

    await logDatasource.saveLog(log);

    const logs = await logDatasource.getLogs(LogServerityLevel.low);

    expect(logs).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          level: LogServerityLevel.low,
          message: "Email sent",
          origin:
            "/home/allenwalker/workspaces/learning/node/05-NOC/src/domain/use-cases/email/send-email-logs.ts",
        }),
      ])
    );
  });
});
