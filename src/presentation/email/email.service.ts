import * as nodemailer from "nodemailer";
import { envs } from "../../config/plugins/env.plugin";
import { Attachment } from "nodemailer/lib/mailer";
import { LogRepository } from "../../domain/repositories/log.repository";
import { LogEntity, LogServerityLevel } from "../../domain/entities/log.entity";

interface SendMailOptions {
  to: string | string[];
  subject: string;
  htmlBody: string;
  attachments?: Attachment[];
}

export class EmailService {
  private transporter = nodemailer.createTransport({
    service: envs.MAILER_SERVICE,
    auth: {
      user: envs.MAILER_EMAIL,
      pass: envs.MAILER_SECRET_KEY,
    },
  });

  constructor(
    // private readonly logRepository: LogRepository
  ) {}

  async sendEmail(props: SendMailOptions): Promise<boolean> {
    const { to, subject, htmlBody, attachments = [] } = props;

    try {
      const sentInformation = await this.transporter.sendMail({
        from: envs.MAILER_EMAIL,
        to,
        subject: subject,
        html: htmlBody,
        attachments,
      });

      // console.log(sentInformation);
      const log = new LogEntity({
        level: LogServerityLevel.low,
        message: "Email sent",
        origin: __filename,
      });

      // this.logRepository.saveLog(log);

      return true;
    } catch (error) {
      const log = new LogEntity({
        level: LogServerityLevel.high,
        message: "Email not sent",
        origin: __filename,
      });

      // this.logRepository.saveLog(log);

      return false;
    }
  }

  sendEmailWithFileSystemLogs(to: string | string[]): Promise<boolean> {
    const subject = "Server logs";
    const htmlBody = `
      <h1>Server logs</h1>
      <p>Attached to this email you will find the logs of the server</p>
    `;
    const attachments: Attachment[] = [
      {
        filename: "logs-all.log",
        path: "./logs/all-logs.log",
      },
      {
        filename: "log-high.log",
        path: "./logs/high-logs.log",
      },
      {
        filename: "log-medium.log",
        path: "./logs/medium-logs.log",
      },
    ];

    return this.sendEmail({ to, subject, htmlBody, attachments });
  }
}
