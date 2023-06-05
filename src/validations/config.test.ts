import * as Config from "./config";
const {
  isValidBaudRate,
  isValidCron,
  isValidSlaveID,
  isValidPortPath,
  isValidOnReadFailRetryTimes,
  isValidShowLogs,
  isValidOutputFile,
  isValidAddress,
} = jest.requireActual<typeof Config>("./config");

describe("Config validation test suite", () => {
  test("[isValidBaudRate] 1. When a baud rate is valid, it should return true", () => {
    const validBaudRate: BaudRates = "9600";

    expect(isValidBaudRate(validBaudRate)).toBe(true);
  });

  test("[isValidBaudRate] 2. When a baud rate is invalid, it should return false", () => {
    const invalidBaudRate = "111111";

    expect(isValidBaudRate(invalidBaudRate)).toBe(false);
  });

  test("[isValidBaudRate] 3. When a baud rate is invalid, it should return false", () => {
    const invalidBaudRate = { baudRate: "9600" };

    expect(isValidBaudRate(invalidBaudRate)).toBe(false);
  });

  const validCron1 = "*/5 * * * *";
  test(`[isValidCron] 1. When a cron is valid (${validCron1}), it should return true`, () => {
    expect(isValidCron(validCron1)).toBe(true);
  });

  const validCron2 = "5-30 * * * *";
  test(`[isValidCron] 2. When a cron is valid (${validCron2}), it should return true`, () => {
    expect(isValidCron(validCron2)).toBe(true);
  });

  const validCron3 = "*/6 */6 */6 */6 */6";
  test(`[isValidCron] 3. When a cron is valid (${validCron3}), it should return true`, () => {
    expect(isValidCron(validCron3)).toBe(true);
  });

  const invalidCron1 = "*6 6 */6 *6 6";
  test(`[isValidCron] 4. When a cron is invalid (${invalidCron1}), it should return false`, () => {
    expect(isValidCron(invalidCron1)).toBe(false);
  });

  const invalidCron2 = "* * 68 * *";
  test(`[isValidCron] 5. When a cron is invalid (${invalidCron2}), it should return false`, () => {
    expect(isValidCron(invalidCron2)).toBe(false);
  });

  const invalidCron3 = "* * * * 10";
  test(`[isValidCron] 6. When a cron is invalid (${invalidCron3}), it should return false`, () => {
    expect(isValidCron(invalidCron3)).toBe(false);
  });

  const invalidCron4 = { cron: "* * * * *" };
  test(`[isValidCron] 7. When a cron is invalid (${invalidCron4}), it should return false`, () => {
    expect(isValidCron(invalidCron4)).toBe(false);
  });

  const slaveID1 = 1;
  test(`[isValidSlaveID] 1. When slave ID is valid (${slaveID1}), it should return true`, () => {
    expect(isValidSlaveID(slaveID1)).toBe(true);
  });

  const slaveID247 = 247;
  test(`[isValidSlaveID] 2. When slave ID is valid (${slaveID247}), it should return true`, () => {
    expect(isValidSlaveID(slaveID247)).toBe(true);
  });

  const slaveID0 = 0;
  test(`[isValidSlaveID] 3. When slave ID is invalid (${slaveID0}), it should return false`, () => {
    expect(isValidSlaveID(slaveID0)).toBe(false);
  });

  const slaveID248 = 248;
  test(`[isValidSlaveID] 4. When slave ID is invalid (${slaveID248}), it should return false`, () => {
    expect(isValidSlaveID(slaveID248)).toBe(false);
  });

  const stringData = "1";
  test(`[isValidSlaveID] 5. When slave ID is invalid (${stringData}), it should return false`, () => {
    expect(isValidSlaveID(stringData)).toBe(false);
  });

  const objectData = { id: 1 };
  test(`[isValidSlaveID] 6. When slave ID is invalid (${objectData}), it should return false`, () => {
    expect(isValidSlaveID(objectData)).toBe(false);
  });

  const portPath1 = "/dev/ttyXURSB0";
  test(`[isValidPortPath] 1. When port path is valid (${portPath1}), it should return true`, () => {
    expect(isValidPortPath(portPath1)).toBe(true);
  });

  const portPath2 = "/dev/ttyACM0";
  test(`[isValidPortPath] 2. When port path is valid (${portPath2}), it should return true`, () => {
    expect(isValidPortPath(portPath2)).toBe(true);
  });

  const portPath3 = "/dev/tatyUSB0";
  test(`[isValidPortPath] 3. When port path is invalid (${portPath3}), it should return false`, () => {
    expect(isValidPortPath(portPath3)).toBe(false);
  });

  const portPath4 = "dev/ttyXURSB0";
  test(`[isValidPortPath] 4. When port path is invalid (${portPath4}), it should return false`, () => {
    expect(isValidPortPath(portPath4)).toBe(false);
  });

  const portPath5 = { portPath: "dev/ttyXURSB0" };
  test(`[isValidPortPath] 4. When port path is invalid (${portPath5}), it should return false`, () => {
    expect(isValidPortPath(portPath5)).toBe(false);
  });

  const orfrt1 = 5;
  test(`[isValidOnReadFailRetryTimes] 1. When retry times is valid (${orfrt1}), it should return true`, () => {
    expect(isValidOnReadFailRetryTimes(orfrt1)).toBe(true);
  });

  const orfrt2 = 4.7;
  test(`[isValidOnReadFailRetryTimes] 2. When retry times is invalid (${orfrt2}), it should return false`, () => {
    expect(isValidOnReadFailRetryTimes(orfrt2)).toBe(false);
  });

  const orfrt3 = -2;
  test(`[isValidOnReadFailRetryTimes] 3. When retry times is invalid (${orfrt3}), it should return false`, () => {
    expect(isValidOnReadFailRetryTimes(orfrt3)).toBe(false);
  });

  const orfrt4 = "5";
  test(`[isValidOnReadFailRetryTimes] 4. When retry times is invalid (${orfrt4} as string), it should return false`, () => {
    expect(isValidOnReadFailRetryTimes(orfrt4)).toBe(false);
  });

  const showLogs1 = true;
  test(`[isValidShowLogs] 1. When show logs is valid (${showLogs1}), it should return true`, () => {
    expect(isValidShowLogs(showLogs1)).toBe(true);
  });

  const showLogs2 = "true";
  test(`[isValidShowLogs] 2. When show logs is invalid (${showLogs2}), it should return false`, () => {
    expect(isValidShowLogs(showLogs2)).toBe(false);
  });

  const showLogs3 = { showLogs: "true" };
  test(`[isValidShowLogs] 3. When show logs is invalid (${showLogs3}), it should return false`, () => {
    expect(isValidShowLogs(showLogs3)).toBe(false);
  });

  const outputFile1 = "/Users/adalovelace";
  test(`[isValidOutputFile] 1. When output file is valid (${outputFile1}), it should return true`, () => {
    expect(isValidOutputFile(outputFile1)).toBe(true);
  });

  const outputFile2 = " /Users/adalovelace";
  test(`[isValidOutputFile] 2. When output file is invalid (${outputFile2}), it should return false`, () => {
    expect(isValidOutputFile(outputFile2)).toBe(false);
  });

  const outputFile3 = { outputFile: "/Users/adalovelace" };
  test(`[isValidOutputFile] 3. When output file is invalid (${outputFile3}), it should return false`, () => {
    expect(isValidOutputFile(outputFile3)).toBe(false);
  });

  const registerAddress1 = "0x0201";
  test(`[isValidAddress] 1. When register address is valid (${registerAddress1}), it should return true`, () => {
    expect(isValidAddress(registerAddress1)).toBe(true);
  });

  const registerAddress2 = "11F3";
  test(`[isValidAddress] 2. When register address is valid (${registerAddress2}), it should return true`, () => {
    expect(isValidAddress(registerAddress2)).toBe(true);
  });

  const registerAddress3 = "0x0AF9";
  test(`[isValidAddress] 3. When register address is valid (${registerAddress3}), it should return true`, () => {
    expect(isValidAddress(registerAddress3)).toBe(true);
  });

  const registerAddress4 = "0xf20201";
  test(`[isValidAddress] 4. When register address is invalid (${registerAddress4}), it should return false`, () => {
    expect(isValidAddress(registerAddress4)).toBe(false);
  });

  const registerAddress5 = "-4f35f3";
  test(`[isValidAddress] 5. When register address is invalid (${registerAddress5}), it should return false`, () => {
    expect(isValidAddress(registerAddress5)).toBe(false);
  });

  const registerAddress6 = "52.61";
  test(`[isValidAddress] 6. When register address is invalid (${registerAddress6}), it should return false`, () => {
    expect(isValidAddress(registerAddress6)).toBe(false);
  });
});
