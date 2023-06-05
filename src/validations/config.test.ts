import * as Config from "./config";
const { isValidBaudRate, isValidCron } =
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
});
