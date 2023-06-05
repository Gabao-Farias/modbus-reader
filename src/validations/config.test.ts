import * as Config from "./config";
const { isValidBaudRate } = jest.requireActual<typeof Config>("./config");

describe("Config validation test suite", () => {
  test("[isValidBaudRate] 1. When a baud rate is valid, it should return true", () => {
    const validBaudRate: BaudRates = "9600";

    expect(isValidBaudRate(validBaudRate)).toBe(true);
  });

  test("[isValidBaudRate] 2. When a baud rate is invalid, it should return false", () => {
    const invalidBaudRate = "111111";

    expect(isValidBaudRate(invalidBaudRate)).toBe(false);
  });
});
