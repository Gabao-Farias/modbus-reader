export const VALID_BAUD_RATES: BaudRates[] = ["115200", "9600"];

export const VALID_FUNCTION_CODES: ModbusReadFunctions[] = [
  "01",
  "02",
  "03",
  "04",
];

/**
 * Lowest valid value of the Modbus register address range.
 */
export const LOWEST_VALUE_REGISTER_ADDRES_RANGE = 0;

/**
 * Highest valid value of the Modbus register address range.
 */
export const HIGHEST_VALUE_REGISTER_ADDRES_RANGE = 65535;
