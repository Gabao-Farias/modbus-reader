import { CRON_VALIDATION_REGEX, VALID_BAUD_RATES } from "../consts";

/**
 * Checks if a given baud rate is valid.
 */
export const isValidBaudRate = (baudRate: string): boolean => {
  for (let index = 0; index < VALID_BAUD_RATES.length; index++) {
    const validBaudRate = VALID_BAUD_RATES[index];

    if (baudRate === validBaudRate) return true;
  }

  return false;
};

/**
 * Checks if the given string is a valid cron format.
 * @param cron
 * @returns
 */
export const isValidCron = (cron: string): boolean =>
  CRON_VALIDATION_REGEX.test(cron);

/**
 * Checks if the given data is a valid Modbus slave address.
 * @param cron
 * @returns
 */
export const isValidSlaveID = (sid: unknown): boolean => {
  if (typeof sid !== "number") return false;

  if (sid < 1 || sid > 247) return false;

  return true;
};
