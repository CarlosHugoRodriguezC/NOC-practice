import fs from "fs";
import { join } from "path";
import { FileSystemDatasource } from "./file-system.datasource";
import { LogEntity, LogServerityLevel } from "../../domain/entities/log.entity";

describe("src/infrastructure/datasources/file-system.datasource.test.ts", () => {
  const logPath = join(__dirname, "../../../logs/");

  beforeEach(() => {
    fs.rmSync(logPath, { recursive: true, force: true });
  });

  test("should create log files if they do not exists ", () => {
    new FileSystemDatasource();
    const files = fs.readdirSync(logPath);
    expect(files).toHaveLength(3);
    expect(files).toEqual(["all-logs.log", "high-logs.log", "medium-logs.log"]);
  });

  test("should save a log in logs-all.log", () => {
    const datasource = new FileSystemDatasource();

    const newLog = new LogEntity({
      level: LogServerityLevel.low,
      message: "test",
      origin: "test",
    });

    datasource.saveLog(newLog);

    const fileContent = fs.readFileSync(join(logPath, "all-logs.log"), "utf-8");
    expect(fileContent).toContain(JSON.stringify(newLog));
  });

  test("should save a log in logs-all.log and medium-logs.log", () => {
    const datasource = new FileSystemDatasource();

    const newLog = new LogEntity({
      level: LogServerityLevel.medium,
      message: "test",
      origin: "test",
    });

    datasource.saveLog(newLog);

    const allLogs = fs.readFileSync(join(logPath, "all-logs.log"), "utf-8");
    const mediumLogs = fs.readFileSync(
      join(logPath, "medium-logs.log"),
      "utf-8"
    );
    expect(allLogs).toContain(JSON.stringify(newLog));
    expect(mediumLogs).toContain(JSON.stringify(newLog));
  });

  test("should save a log in logs-all.log and high-logs.log", () => {
    const datasource = new FileSystemDatasource();

    const newLog = new LogEntity({
      level: LogServerityLevel.high,
      message: "test",
      origin: "test",
    });

    datasource.saveLog(newLog);

    const allLogs = fs.readFileSync(join(logPath, "all-logs.log"), "utf-8");
    const mediumLogs = fs.readFileSync(join(logPath, "high-logs.log"), "utf-8");
    expect(allLogs).toContain(JSON.stringify(newLog));
    expect(mediumLogs).toContain(JSON.stringify(newLog));
  });

  test("should return all logs", async () => {
    const datasource = new FileSystemDatasource();

    const lowLog = new LogEntity({
      level: LogServerityLevel.high,
      message: "test",
      origin: "test",
    });

    const mediumLog = new LogEntity({
      level: LogServerityLevel.medium,
      message: "test",
      origin: "test",
    });

    const highLog = new LogEntity({
      level: LogServerityLevel.high,
      message: "test",
      origin: "test",
    });

    datasource.saveLog(lowLog);
    datasource.saveLog(mediumLog);
    datasource.saveLog(highLog);

    const lowLogs: LogEntity[] = await datasource.getLogs(
      LogServerityLevel.low
    );

    const mediumLogs: LogEntity[] = await datasource.getLogs(
      LogServerityLevel.medium
    );

    const highLogs: LogEntity[] = await datasource.getLogs(
      LogServerityLevel.high
    );

    expect(lowLogs).toHaveLength(3);
    expect(mediumLogs).toHaveLength(1);
    expect(highLogs).toHaveLength(2);

    expect(lowLogs).toContainEqual(lowLog);
    expect(lowLogs).toContainEqual(mediumLog);
    expect(lowLogs).toContainEqual(highLog);
  });
});
