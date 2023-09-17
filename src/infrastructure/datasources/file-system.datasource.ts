import fs from "fs";
import { LogDataSource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogServerityLevel } from "../../domain/entities/log.entity";
import { log } from "console";

export class FileSystemDatasource implements LogDataSource {
  private readonly logPath = "logs/";
  private readonly allLogsPath = "logs/all-logs.log";
  private readonly mediumLogsPath = "logs/medium-logs.log";
  private readonly highLogsPath = "logs/high-logs.log";

  constructor() {
    this.createLogsFiles();
  }

  private createLogsFiles = () => {
    if (!fs.existsSync(this.logPath)) {
      fs.mkdirSync(this.logPath);
    }

    [this.allLogsPath, this.mediumLogsPath, this.highLogsPath].forEach(
      (path) => {
        if (!fs.existsSync(path)) {
          fs.writeFileSync(path, "");
        }
      }
    );
  };

  async saveLog(newLog: LogEntity): Promise<void> {
    const logAsJson = `${JSON.stringify(newLog)}\n`;

    fs.appendFileSync(this.allLogsPath, logAsJson);
    console.log(`Log saved in file system #${logAsJson}}`);

    if (newLog.level === LogServerityLevel.low) return;

    if (newLog.level === LogServerityLevel.medium)
      return fs.appendFileSync(this.mediumLogsPath, logAsJson);

    if (newLog.level === LogServerityLevel.high)
      return fs.appendFileSync(this.highLogsPath, logAsJson);
  }

  private getLogsFromFile = (path: string): LogEntity[] => {
    const content = fs.readFileSync(path, "utf-8");

    if (content === "") return [];

    const logs = content
      .split("\n")
      .filter((log) => !!log)
      .map(LogEntity.jsonToLogEntity);

    return logs;
  };

  async getLogs(severityLevel: LogServerityLevel): Promise<LogEntity[]> {
    switch (severityLevel) {
      case LogServerityLevel.low:
        return this.getLogsFromFile(this.allLogsPath);
      case LogServerityLevel.medium:
        return this.getLogsFromFile(this.mediumLogsPath);
      case LogServerityLevel.high:
        return this.getLogsFromFile(this.highLogsPath);
      default:
        throw new Error(`Severity level ${severityLevel} not found`);
    }
  }
}
