import { CronService } from "./cron.service";

describe("src/presentation/cron/cron.service.test.ts", () => {
  const mockTick = jest.fn();
  test("should create a cron job", (done) => {
    const job = CronService.createJob("* * * * * *", mockTick);

    setTimeout(() => {
      expect(mockTick).toHaveBeenCalledTimes(2);
      job.stop();
      done();
    }, 2000);
  });
});
