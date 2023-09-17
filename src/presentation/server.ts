import { LogServerityLevel } from "../domain/entities/log.entity";
import { CheckService } from "../domain/use-cases/checks/check-service";
import { CheckServiceMultiple } from "../domain/use-cases/checks/check-service-multiple";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";

import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { MongoLogDatasource } from "../infrastructure/datasources/mongo-log.datasource";
import { PostgresLogDatasource } from "../infrastructure/datasources/postgres-log.datasource";
import { LogRespositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron.service";
import { EmailService } from "./email/email.service";

const fsLogRepository = new LogRespositoryImpl(new FileSystemDatasource());

const mongoLogRepository = new LogRespositoryImpl(new MongoLogDatasource());

const postgresLogRepository = new LogRespositoryImpl(
  new PostgresLogDatasource()
);

export class Server {
  public static async start() {
    console.log("Server started...");

    // const logs = await logRepository.getLogs(LogServerityLevel.low);

    // console.log(logs);

    const job = CronService.createJob("*/5 * * * * *", () => {
      // const url = "https://www.google.com";
      const url = "http://localhost:3000";
      new CheckServiceMultiple(
        [fsLogRepository, mongoLogRepository, postgresLogRepository],
        () => console.log(`${url} is OK`),
        (error) => console.log(error)
      ).execute(url);
    });

    // const email = new EmailService(fileSystemLogRespository);
    // email.sendEmailWithFileSystemLogs([
    //   "allenwalker123.hr@gmail.com",
    //   "carlos.rodriguez@kingtide.com",
    // ]);

    // new SendEmailLogs(new EmailService(), fileSystemLogRespository).execute(
    //   "allenwalker123.hr@gmail.com"
    // );

    // email.sendEmail({
    //   to: "cahuroca.aw@gmail.com",
    //   subject: "Test",
    //   htmlBody: "<h1>Test</h1>",
    // });
  }
}
