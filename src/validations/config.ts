import {
  CRON_VALIDATION_REGEX,
  HEX_VALIDATION_REGEX,
  HIGHEST_VALUE_REGISTER_ADDRES_RANGE,
  LINUX_PATH_VALIDATION_REGEX,
  LOWEST_VALUE_REGISTER_ADDRES_RANGE,
  PORT_PATH_VALIDATION_REGEX,
  VALID_BAUD_RATES,
} from "../consts";
import { hexToDec } from "../utils";

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
 * Checks if the given data is a valid amount of times for retry read.
 * @param orfrt
 * @returns
 */
export const isValidOnReadFailRetryTimes = (orfrt: unknown): boolean => {
  if (typeof orfrt !== "number") return false;

  if (!Number.isInteger(orfrt)) return false;

  if (!(orfrt >= 0)) return false;

  return true;
};

/**
 * Checks if the given data is a valid show logs param.
 * @param showLogs
 * @returns
 */
export const isValidShowLogs = (showLogs: unknown): boolean => {
  if (typeof showLogs !== "boolean") return false;

  return true;
};

/**
 * Checks if the given data is a valid output file path.
 * @param outFile
 * @returns
 */
export const isValidOutputFile = (outFile: unknown): boolean => {
  if (typeof outFile !== "string") return false;

  return LINUX_PATH_VALIDATION_REGEX.test(outFile);
};

/**
 * Checks if the given data is a valid variable name.
 * @param varName
 * @returns
 */
export const isValidVariableName = (varName: unknown): boolean => {
  if (typeof varName !== "string") return false;

  return true;
};

/**
 * Checks if the given data is a valid register address.
 * @param addr
 * @returns
 */
export const isValidAddress = (addr: unknown): boolean => {
  if (typeof addr !== "string") return false;

  if (!HEX_VALIDATION_REGEX.test(addr)) return false;

  const decimalValue = hexToDec(addr);

  if (!Number.isInteger(decimalValue)) return false;

  if (
    decimalValue < LOWEST_VALUE_REGISTER_ADDRES_RANGE ||
    decimalValue > HIGHEST_VALUE_REGISTER_ADDRES_RANGE
  )
    return false;

  return true;
};

/**
 * Checks if the given data is a valid ratio.
 * @param ratio
 * @returns
 */
export const isValidRatio = (ratio: unknown): boolean => {
  if (typeof ratio !== "number") return false;

  return true;
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
