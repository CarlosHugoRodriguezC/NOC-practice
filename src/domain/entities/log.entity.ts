export enum LogServerityLevel {
  low = "low",
  medium = "medium",
  high = "high",
}

export class LogEntity {
  public level: LogServerityLevel;
  public message: string;
  public createdAt: Date;

  constructor(level: LogServerityLevel, message: string) {
    this.level = level;
    this.message = message;
    this.createdAt = new Date();
  }

  static jsonToLogEntity = (json: string): LogEntity => {
    const { level, message, createdAt } = JSON.parse(json);

    if (!level || !message || !createdAt) {
      throw new Error("Invalid log format");
    }

    const log = new LogEntity(level, message);
    log.createdAt = new Date(createdAt);

    return log;
  };
}
