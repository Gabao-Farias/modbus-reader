/**
 * Modbus functions available for use.
 */
declare type ModbusReadFunctions = "01" | "02" | "03" | "04";

/**
 * Modbus functions available for use.
 */
declare type ModbusReadFunctionsNames =
  | "readCoils"
  | "readDiscreteInputs"
  | "readHoldingRegisters"
  | "readInputRegisters";

/**
 * Modbus baud rates available for use.
 */
declare type BaudRates = "9600" | "115200";

/**
 * Modbus props for read purpose.
 */
declare type ModbusReadProps = {
  address: string;
  functionCode: ModbusReadFunctions;
};

/**
 * Generic mapper for modbus read functions.
 */
declare type ModbusReadFunctionsGenericMapper<T = ModbusReadFunctionsNames> = {
  [x in ModbusReadFunctions]: T;
};
