import { LogDataSource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogServerityLevel } from "../../domain/entities/log.entity";
import { LogRespositoryImpl } from "./log.repository.impl";

describe("src/infrastructure/repositories/log-repository.impl.test.ts", () => {
  const mockDataSource = {
    saveLog: jest.fn(),
    getLogs: jest.fn(),
  } as LogDataSource;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("saveLog should call the datasource with arguments", async () => {
    const logRepository = new LogRespositoryImpl(mockDataSource);
    const mockLog = {
      level: "low",
      message: "test",
      origin: "test",
    } as LogEntity;

    await logRepository.saveLog(mockLog);

    expect(mockDataSource.saveLog).toHaveBeenCalledTimes(1);
    expect(mockDataSource.saveLog).toHaveBeenCalledWith(mockLog);
  });

  test("getLogs should call the datasource with arguments", async () => {
    const logRepository = new LogRespositoryImpl(mockDataSource);

    await logRepository.getLogs("low" as LogServerityLevel);

    expect(mockDataSource.getLogs).toHaveBeenCalledTimes(1);
    expect(mockDataSource.getLogs).toHaveBeenCalledWith("low");
  });
});
