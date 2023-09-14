import { CheckService } from "../domain/use-cases/checks/check-service";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";

import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { LogRespositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron.service";
import { EmailService } from "./email/email.service";

const fileSystemLogRespository = new LogRespositoryImpl(
  new FileSystemDatasource()
);
export class Server {
  public static start() {
    console.log("Server started...");

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
    // const job = CronService.createJob("*/5 * * * * *", () => {
    //   const url = "https://www.google.com";
    //   // const url = "http://localhost:3000";
    //   new CheckService(
    //     fileSystemLogRespository,
    //     () => console.log(`${url} is OK`),
    //     (error) => console.log(error)
    //   ).execute(url);
    // });
  }
}
