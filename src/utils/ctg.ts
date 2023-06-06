/**
 * Checks if given data is type of Register Type.
 * @param register
 * @returns
 */
export const isTypeOfRegisterType = (
  register: unknown
): register is RegisterType => {
  return (
    typeof register === "object" &&
    register !== null &&
    "variableName" in register &&
    "address" in register &&
    "functionCode" in register
  );
};

/**
 * Checks if given data is type of Config Type.
 * @param config
 * @returns
 */
export const isTypeOfConfigType = (config: unknown): config is ConfigType => {
  return (
    typeof config === "object" &&
    config !== null &&
    "portPath" in config &&
    "baudRate" in config &&
    "cron" in config &&
    "onReadFailRetryTimes" in config &&
    "showLogs" in config &&
    "outputFile" in config &&
    "registers" in config &&
    "slaveID" in config
  );
};
