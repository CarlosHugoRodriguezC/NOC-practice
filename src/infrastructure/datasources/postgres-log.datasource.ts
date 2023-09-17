import { PrismaClient, SeverityLevel } from "@prisma/client";
import { LogDataSource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogServerityLevel } from "../../domain/entities/log.entity";

const SeverityLevelMap = {
  [LogServerityLevel.low]: SeverityLevel.LOW,
  [LogServerityLevel.medium]: SeverityLevel.MEDIUM,
  [LogServerityLevel.high]: SeverityLevel.HIGH,
};

const SeverityLevelMapReverse = {
  [SeverityLevel.LOW]: LogServerityLevel.low,
  [SeverityLevel.MEDIUM]: LogServerityLevel.medium,
  [SeverityLevel.HIGH]: LogServerityLevel.high,
};

const prisma = new PrismaClient();

export class PostgresLogDatasource implements LogDataSource {
  async saveLog(log: LogEntity): Promise<void> {
    const { message, level: logLevel, origin } = log;

    const level = SeverityLevelMap[logLevel];

    const newLog = await prisma.logModel.create({
      data: {
        message,
        level,
        origin,
      },
    });

    console.log(`Log saved in postgres: log #${newLog.id} `);
  }
  async getLogs(severityLevel: LogServerityLevel): Promise<LogEntity[]> {
    const level = SeverityLevelMap[severityLevel];

    const logs = await prisma.logModel.findMany({
      where: {
        level,
      },
    });

    return logs.map((log) => {
      const { message, level: logLevel, origin, createdAt } = log;

      return LogEntity.fromObject({
        message,
        level: SeverityLevelMapReverse[logLevel],
        origin,
        createdAt,
      });
    });
  }
}
