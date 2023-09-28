import { LogEntity, LogServerityLevel } from "./log.entity";

describe("domain/entities/log.entity.ts", () => {
  const logObj = {
    origin: "log.entity.test.ts",
    message: "test",
    level: LogServerityLevel.low,
    createdAt: new Date(),
  };

  test("should create a LogEntity instance", async () => {
    const { createdAt, ..._logObj } = logObj;
    const log = new LogEntity(_logObj);

    expect(log).toBeInstanceOf(LogEntity);
    expect(log.createdAt).toBeInstanceOf(Date);
    expect(log.message).toBe(logObj.message);
    expect(log.level).toBe(logObj.level);
    expect(log.origin).toBe(logObj.origin);
  });

  test("should return a LogEntity instance from json", async () => {
    const logjson =
      '{"createdAt":"2023-09-17T06:14:10.005Z","level":"high","message":"error with http://localhost:3000: TypeError: fetch failed","origin":"check-service-multiple.ts"}';

    const log = LogEntity.jsonToLogEntity(logjson);

    expect(log).toBeInstanceOf(LogEntity);
    expect(log).toBeInstanceOf(LogEntity);
    expect(log.createdAt).toBeInstanceOf(Date);
    expect(log.message).toBe(
      "error with http://localhost:3000: TypeError: fetch failed"
    );
    expect(log.level).toBe(LogServerityLevel.high);
    expect(log.origin).toBe("check-service-multiple.ts");
  });

  test("should throw an error when creating a log entity instance from json", async () => {
    const logjson =
      '{"createdAt":"2023-09-17T06:14:10.005Z","level":"high","origin":"check-service-multiple.ts"}';

    expect(() => LogEntity.jsonToLogEntity(logjson)).toThrowError(
      "Invalid log format"
    );
  });

  test("should create a log entity instance from object", async () => {
    const log = LogEntity.fromObject(logObj);

    expect(log).toBeInstanceOf(LogEntity);
    expect(log.createdAt).toBeInstanceOf(Date);
    expect(log.message).toBe(logObj.message);
    expect(log.level).toBe(logObj.level);
    expect(log.origin).toBe(logObj.origin);
  });

  test("should throw an error when creating a log entity instance from object", async () => {
    const { createdAt, ..._logObj } = logObj;

    expect(() => LogEntity.fromObject(_logObj)).toThrowError(
      "Invalid log format"
    );
  });
});
