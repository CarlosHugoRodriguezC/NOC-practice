export enum LogServerityLevel {
  low = "low",
  medium = "medium",
  high = "high",
}

export interface LogEntityProps {
  level: LogServerityLevel;
  message: string;
  origin: string;
  createdAt?: Date;
}

export class LogEntity {
  public level: LogServerityLevel;
  public message: string;
  public createdAt: Date;
  public origin: string;

  constructor(props: LogEntityProps) {
    const { level, message, origin, createdAt = new Date() } = props;

    this.createdAt = createdAt;
    this.level = level;
    this.message = message;
    this.origin = origin;
  }

  static jsonToLogEntity = (json: string): LogEntity => {
    const { level, message, createdAt, origin } = JSON.parse(json);

    if (!level || !message || !createdAt) {
      throw new Error("Invalid log format");
    }

    const createdAtDate = new Date(createdAt);

    const log = new LogEntity({
      level,
      message,
      createdAt: createdAtDate,
      origin,
    });

    return log;
  };
}
