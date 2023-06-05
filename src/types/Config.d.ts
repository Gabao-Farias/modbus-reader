/**
 * Type defining the configuration props of the register.
 */
declare type RegisterType = {
  /**
   * This will be the key of the JSON containing it's data.
   */
  variableName: string;
  /**
   * Hexadecimal string representing the register address.
   */
  address: string;
  /**
   * A number which will multiply the value read from the given address.
   */
  ratio?: number;
  /**
   * Subset of string representing the function code.
   */
  functionCode: ModbusReadFunctions;
};

/**
 * Type defining the type of the configuration
 */
declare type ConfigType = {
  /**
   * Path where your device is going to be located.
   */
  portPath: string;
  /**
   * Baud rate of the serial connection.
   */
  baudRate?: BaudRates;
  /**
   * String defining the cron of execution of the project.
   */
  cron?: string;
  /**
   * If the process of reading the register fails, it can be set a number to determine the amount of retries.
   */
  onReadFailRetryTimes?: number;
  /**
   * Defines if internal processes logs must be shown.
   */
  showLogs?: boolean;
  /**
   * Path of the file that will contain all the read data saved.
   */
  outputFile?: string;
  /**
   * Set of registers to be read.
   */
  registers?: RegisterType[];
  /**
   * ID of the server.
   */
  slaveID?: number;
};
