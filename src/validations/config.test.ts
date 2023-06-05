import * as Config from "./config";
const { isValidBaudRate, isValidCron, isValidSlaveID } =
  jest.requireActual<typeof Config>("./config");

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
});
