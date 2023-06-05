import {
  CRON_VALIDATION_REGEX,
  PORT_PATH_VALIDATION_REGEX,
  VALID_BAUD_RATES,
} from "../consts";

/**
 * Checks if the given data is a valid path port.
 * @param path
 * @returns
 */
export const isValidPortPath = (path: unknown): boolean => {
  if (typeof path !== "string") return false;

  return PORT_PATH_VALIDATION_REGEX.test(path);
};
/**
 * Checks if a given data is a valid baud rate.
 * @param baudRate
 * @returns
 */
export const isValidBaudRate = (baudRate: unknown): boolean => {
  if (typeof baudRate !== "string") return false;

  for (let index = 0; index < VALID_BAUD_RATES.length; index++) {
    const validBaudRate = VALID_BAUD_RATES[index];

    if (baudRate === validBaudRate) return true;
  }

  return false;
};

/**
 * Checks if the given data is a valid cron format.
 * @param cron
 * @returns
 */
export const isValidCron = (cron: unknown): boolean => {
  if (typeof cron !== "string") return false;

  return CRON_VALIDATION_REGEX.test(cron);
};

/**
 * Checks if the given data is a valid Modbus slave address.
 * @param sid
 * @returns
 */
export const isValidSlaveID = (sid: unknown): boolean => {
  if (typeof sid !== "number") return false;

  if (sid < 1 || sid > 247) return false;

  return true;
};
