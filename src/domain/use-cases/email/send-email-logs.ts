import { EmailService } from "../../../presentation/email/email.service";
import { LogEntity, LogServerityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repositories/log.repository";

interface SendLogEmailUseCase {
  execute(to: string | string[]): Promise<boolean>;
}

export class SendEmailLogs implements SendLogEmailUseCase {
  constructor(
    private readonly emailService: EmailService,
    private readonly logRepository: LogRepository
  ) {}
  async execute(to: string | string[]): Promise<boolean> {
    try {
      const sent = await this.emailService.sendEmailWithFileSystemLogs(to);
      if (!sent) {
        throw new Error("Email not sent");
      }

      const log = new LogEntity({
        message: "Email sent",
        level: LogServerityLevel.low,
        origin: __filename,
      });

      this.logRepository.saveLog(log);

      return true;
    } catch (error) {
      const log = new LogEntity({
        message: `Error sending email: ${error}`,
        level: LogServerityLevel.high,
        origin: __filename,
      });
      this.logRepository.saveLog(log);
      return false;
    }
  }
}
