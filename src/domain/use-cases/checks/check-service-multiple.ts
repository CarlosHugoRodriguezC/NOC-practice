import path from "path";
import { LogEntity, LogServerityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repositories/log.repository";

const currentPath = path.basename(__filename);

interface CheckServiceUseCase {
  execute(url: string): Promise<boolean>;
}

type SuccessCallback = (() => void) | undefined;
type ErrorCallback = ((error: string) => void) | undefined;

export class CheckServiceMultiple implements CheckServiceUseCase {
  constructor(
    private readonly logRepositories: LogRepository[],
    private readonly successCallback: SuccessCallback,
    private readonly errorCallback: ErrorCallback
  ) {}

  private callLogs(log: LogEntity) {
    this.logRepositories.forEach((logRepository) => {
      logRepository.saveLog(log);
    });
  }

  async execute(url: string): Promise<boolean> {
    try {
      const req = await fetch(url);
      if (!req.ok) {
        throw new Error(`Error checking service ${url}`);
      }

      const log = new LogEntity({
        level: LogServerityLevel.low,
        message: `${url} is OK`,
        origin: currentPath,
      });

      this.callLogs(log);

      this.successCallback && this.successCallback();

      return true;
    } catch (error) {
      const errorMessage = `error with ${url}: ${error}`;

      const log = new LogEntity({
        level: LogServerityLevel.high,
        message: errorMessage,
        origin: currentPath,
      });

      this.callLogs(log);

      this.errorCallback && this.errorCallback(`error: ${error}`);

      return false;
    }
  }
}
