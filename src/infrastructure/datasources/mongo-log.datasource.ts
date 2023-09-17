import { LogModel } from "../../data/mongo";
import { LogDataSource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogServerityLevel } from "../../domain/entities/log.entity";

export class MongoLogDatasource implements LogDataSource {
  async saveLog(log: LogEntity): Promise<void> {
    const newLog = await LogModel.create(log);
    console.log("New log created: ", newLog._id);
  }
  async getLogs(severityLevel: LogServerityLevel): Promise<LogEntity[]> {
    const mongoLogs = await LogModel.find({ level: severityLevel });

    const logs = mongoLogs.map(LogEntity.fromObject);

    return logs;
  }
}
