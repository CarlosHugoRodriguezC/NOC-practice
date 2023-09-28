import { EmailService } from "../../../presentation/email/email.service";
import { LogEntity } from "../../entities/log.entity";
import { SendEmailLogs } from "./send-email-logs";

describe("domain/use-cases/email/send-email-logs.test.ts", () => {
  const mockEmailService = {
    sendEmailWithFileSystemLogs: jest.fn().mockReturnValue(true),
  };

  const mockLogRepository = {
    saveLog: jest.fn(),
    getLogs: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const sendEmailLogs = new SendEmailLogs(
    mockEmailService as unknown as EmailService,
    mockLogRepository
  );

  test("should call sendEmail and SaveLog", async () => {
    const result = await sendEmailLogs.execute("carlos@mail.test");

    expect(result).toBe(true);
    expect(mockEmailService.sendEmailWithFileSystemLogs).toHaveBeenCalledTimes(
      1
    );
    expect(mockLogRepository.saveLog).toBeCalledWith(expect.any(LogEntity));

    expect(mockLogRepository.saveLog).toBeCalledWith({
      createdAt: expect.any(Date),
      level: "low",
      message: "Email sent",
      origin:
        "/home/allenwalker/workspaces/learning/node/05-NOC/src/domain/use-cases/email/send-email-logs.ts",
    });
  });

  test("should log in case of error", async () => {
    mockEmailService.sendEmailWithFileSystemLogs = jest
      .fn()
      .mockReturnValue(false);

    const result = await sendEmailLogs.execute("carlos@mail.test");

    expect(result).toBe(false);
    expect(mockEmailService.sendEmailWithFileSystemLogs).toHaveBeenCalledTimes(
      1
    );
    expect(mockLogRepository.saveLog).toBeCalledWith(expect.any(LogEntity));

    expect(mockLogRepository.saveLog).toBeCalledWith({
      createdAt: expect.any(Date),
      level: "high",
      message: "Error sending email: Error: Email not sent",
      origin: "/home/allenwalker/workspaces/learning/node/05-NOC/src/domain/use-cases/email/send-email-logs.ts",
    });
  });
});
