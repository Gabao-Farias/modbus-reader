import {
  CRON_VALIDATION_REGEX,
  HEX_VALIDATION_REGEX,
  HIGHEST_VALUE_REGISTER_ADDRES_RANGE,
  HIGHEST_VALUE_SLAVE_ID_RANGE,
  LINUX_PATH_VALIDATION_REGEX,
  LOWEST_VALUE_REGISTER_ADDRES_RANGE,
  LOWEST_VALUE_SLAVE_ID_RANGE,
  PORT_PATH_VALIDATION_REGEX,
  VALID_BAUD_RATES,
  VALID_FUNCTION_CODES,
} from "../consts";
import { hexToDec, isTypeOfConfigType, isTypeOfRegisterType } from "../utils";

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
 * Checks if the given data is a valid Modbus function code.
 * @param functionCode
 * @returns
 */
export const isValidFunctionCode = (functionCode: unknown): boolean => {
  if (typeof functionCode !== "string") return false;

  for (let index = 0; index < VALID_FUNCTION_CODES.length; index++) {
    const validFunctionCode = VALID_FUNCTION_CODES[index];

    if (validFunctionCode === functionCode) return true;
  }

  return false;
};

/**
 * Checks if the given data is a valid register config.
 * @param register
 * @returns
 */
export const isValidRegister = (register: unknown): boolean => {
  if (!isTypeOfRegisterType(register)) return false;

  if (!isValidAddress(register.address)) return false;
  if (!isValidFunctionCode(register.functionCode)) return false;
  if (!isValidVariableName(register.variableName)) return false;
  if (register.ratio) if (!isValidRatio(register.ratio)) return false;

  return true;
};

/**
 * Checks if the given data is a valid set of register config array.
 * @param registers
 * @returns
 */
export const areValidRegisters = (registers: unknown): boolean => {
  if (!Array.isArray(registers)) return false;

  for (let index = 0; index < registers.length; index++) {
    const register = registers[index];

    if (!isValidRegister(register)) return false;
  }

  return true;
};

/**
 * Checks if the given data is a valid Modbus slave address.
 * @param sid
 * @returns
 */
export const isValidSlaveID = (sid: unknown): boolean => {
  if (typeof sid !== "number") return false;

  if (sid < LOWEST_VALUE_SLAVE_ID_RANGE || sid > HIGHEST_VALUE_SLAVE_ID_RANGE)
    return false;

  return true;
};

/**
 * Checks if the given data is a valid Config Type object.
 * @param config
 * @returns
 */
export const isValidConfig = (config: unknown) => {
  if (!isTypeOfConfigType(config)) return false;

  if (!isValidPortPath(config.portPath)) return false;
  if (!isValidBaudRate(config.baudRate)) return false;
  if (config.cron && !isValidCron(config.cron)) return false;
  if (!isValidOnReadFailRetryTimes(config.onReadFailRetryTimes)) return false;
  if (!isValidShowLogs(config.showLogs)) return false;
  if (!isValidOutputFile(config.outputFile)) return false;
  if (!areValidRegisters(config.registers)) return false;
  if (!isValidSlaveID(config.slaveID)) return false;

  return true;
};
