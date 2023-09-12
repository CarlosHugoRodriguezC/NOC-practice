import { LogDataSource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogServerityLevel } from "../../domain/entities/log.entity";
import { LogRepository } from "../../domain/repositories/log.repository";

export class LogRespositoryImpl implements LogRepository {
  constructor(private readonly dataSource: LogDataSource) {}

  async saveLog(log: LogEntity): Promise<void> {
    await this.dataSource.saveLog(log);
  }
  async getLogs(severityLevel: LogServerityLevel): Promise<LogEntity[]> {
    return await this.dataSource.getLogs(severityLevel);
  }
}
