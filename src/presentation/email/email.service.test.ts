import nodemailer from "nodemailer";
import { EmailService, SendMailOptions } from "./email.service";

describe("src/presentation/email/email.service.test.ts", () => {
  const mockSendMail = jest.fn();
  nodemailer.createTransport = jest.fn().mockReturnValue({
    sendMail: mockSendMail,
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should send email", async () => {
    const emailService = new EmailService();

    const options: SendMailOptions = {
      to: "allenwalker123.hr@gmail.com",
      subject: "test",
      htmlBody: "<h1>test</h1>",
    };

    await emailService.sendEmail(options);

    expect(mockSendMail).toHaveBeenCalledTimes(1);
    expect(mockSendMail).toHaveBeenCalledWith({
      attachments: expect.any(Array),
      html: options.htmlBody,
      from: expect.any(String),
      subject: options.subject,
      to: options.to,
    });
  });

  test("should send email with attachments", async () => {
    const emailService = new EmailService();

    await emailService.sendEmailWithFileSystemLogs(
      "allenwalker123.hr@gmail.com"
    );

    expect(mockSendMail).toHaveBeenCalledTimes(1);
    expect(mockSendMail).toHaveBeenCalledWith({
      attachments: expect.any(Array),
      html: expect.any(String),
      from: expect.any(String),
      subject: expect.any(String),
      to: expect.any(String),
    });
  });
});
