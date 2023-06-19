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

/**
 * Lowest valid value of the Modbus register address range.
 */
export const LOWEST_VALUE_SLAVE_ID_RANGE = 1;

/**
 * Highest valid value of the Modbus register address range.
 */
export const HIGHEST_VALUE_SLAVE_ID_RANGE = 247;

/**
 * Default timeout defined for register read.
 */
export const REGISTER_READ_TIMEOUT = 1000;

/**
 * Relation of modbus read functions and it's names.
 */
export const MODBUS_READ_FUNCTIONS_TO_FUNCTIONS_NAMES: ModbusReadFunctionsGenericMapper =
  {
    "01": `readCoils`,
    "02": `readDiscreteInputs`,
    "03": `readHoldingRegisters`,
    "04": `readInputRegisters`,
  };
