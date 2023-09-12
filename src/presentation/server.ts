import { CheckService } from "../domain/use-cases/checks/check-service";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { LogRespositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";

const fileSystemLogRespository = new LogRespositoryImpl(
  new FileSystemDatasource()
);
export class Server {
  public static start() {
    console.log("Server started...");
    const job = CronService.createJob("*/5 * * * * *", () => {
      // const url = "https://www.google.com";
      const url = "http://localhost:3000";
      new CheckService(
        fileSystemLogRespository,
        () => console.log(`${url} is OK`),
        (error) => console.log(error)
      ).execute(url);
    });
  }
}
