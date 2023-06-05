import { VALID_BAUD_RATES } from "../consts";

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
