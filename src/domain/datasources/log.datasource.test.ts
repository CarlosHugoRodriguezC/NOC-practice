import { LogEntity, LogServerityLevel } from "../entities/log.entity";
import { LogDataSource } from "./log.datasource";

describe("domain/datasources/log.datasource.ts", () => {
  const newLog = new LogEntity({
    origin: "log.datasource.test.ts",
    message: "test",
    level: LogServerityLevel.low,
  });

  class MockLogDatasource implements LogDataSource {
    async saveLog(log: LogEntity): Promise<void> {
      return;
    }
    async getLogs(severityLevel: LogServerityLevel): Promise<LogEntity[]> {
      return [newLog];
    }
  }

  test("should test the abstract class", async () => {
    const mockLogDatasource = new MockLogDatasource();

    expect(mockLogDatasource).toBeInstanceOf(MockLogDatasource);
    expect(typeof mockLogDatasource.saveLog).toBe("function");
    expect(typeof mockLogDatasource.getLogs).toBe("function");

    await mockLogDatasource.saveLog(newLog);

    const logs = await mockLogDatasource.getLogs(LogServerityLevel.low);

    expect(logs).toHaveLength(1);
    expect(logs[0]).toBeInstanceOf(LogEntity);
  });
});
