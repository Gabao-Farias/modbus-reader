import {
  areValidRegisters,
  isValidAddress,
  isValidBaudRate,
  isValidConfig,
  isValidCron,
  isValidFunctionCode,
  isValidOnReadFailRetryTimes,
  isValidOutputFile,
  isValidPortPath,
  isValidRatio,
  isValidRegister,
  isValidShowLogs,
  isValidSlaveID,
  isValidVariableName,
} from "./config";

describe("Config validation test suite", () => {
  test("[isValidBaudRate] 1. When a baud rate is valid, it should return true", () => {
    const validBaudRate: BaudRates = "9600";

    expect(isValidBaudRate(validBaudRate)).toBe(true);
  });

  test("[isValidBaudRate] 2. When a baud rate is invalid, it should return false", () => {
    const invalidBaudRate = "111111";

    expect(isValidBaudRate(invalidBaudRate)).toBe(false);
  });

  test("[isValidBaudRate] 3. When a baud rate is invalid, it should return false", () => {
    const invalidBaudRate = { baudRate: "9600" };

    expect(isValidBaudRate(invalidBaudRate)).toBe(false);
  });

  const validCron1 = "*/5 * * * *";
  test(`[isValidCron] 1. When a cron is valid (${validCron1}), it should return true`, () => {
    expect(isValidCron(validCron1)).toBe(true);
  });

  const validCron2 = "5-30 * * * *";
  test(`[isValidCron] 2. When a cron is valid (${validCron2}), it should return true`, () => {
    expect(isValidCron(validCron2)).toBe(true);
  });

  const validCron3 = "*/6 */6 */6 */6 */6";
  test(`[isValidCron] 3. When a cron is valid (${validCron3}), it should return true`, () => {
    expect(isValidCron(validCron3)).toBe(true);
  });

  const invalidCron1 = "*6 6 */6 *6 6";
  test(`[isValidCron] 4. When a cron is invalid (${invalidCron1}), it should return false`, () => {
    expect(isValidCron(invalidCron1)).toBe(false);
  });

  const invalidCron2 = "* * 68 * *";
  test(`[isValidCron] 5. When a cron is invalid (${invalidCron2}), it should return false`, () => {
    expect(isValidCron(invalidCron2)).toBe(false);
  });

  const invalidCron3 = "* * * * 10";
  test(`[isValidCron] 6. When a cron is invalid (${invalidCron3}), it should return false`, () => {
    expect(isValidCron(invalidCron3)).toBe(false);
  });

  const invalidCron4 = { cron: "* * * * *" };
  test(`[isValidCron] 7. When a cron is invalid (${invalidCron4}), it should return false`, () => {
    expect(isValidCron(invalidCron4)).toBe(false);
  });

  const slaveID1 = 1;
  test(`[isValidSlaveID] 1. When slave ID is valid (${slaveID1}), it should return true`, () => {
    expect(isValidSlaveID(slaveID1)).toBe(true);
  });

  const slaveID247 = 247;
  test(`[isValidSlaveID] 2. When slave ID is valid (${slaveID247}), it should return true`, () => {
    expect(isValidSlaveID(slaveID247)).toBe(true);
  });

  const slaveID0 = 0;
  test(`[isValidSlaveID] 3. When slave ID is invalid (${slaveID0}), it should return false`, () => {
    expect(isValidSlaveID(slaveID0)).toBe(false);
  });

  const slaveID248 = 248;
  test(`[isValidSlaveID] 4. When slave ID is invalid (${slaveID248}), it should return false`, () => {
    expect(isValidSlaveID(slaveID248)).toBe(false);
  });

  const stringData = "1";
  test(`[isValidSlaveID] 5. When slave ID is invalid (${stringData}), it should return false`, () => {
    expect(isValidSlaveID(stringData)).toBe(false);
  });

  const objectData = { id: 1 };
  test(`[isValidSlaveID] 6. When slave ID is invalid (${objectData}), it should return false`, () => {
    expect(isValidSlaveID(objectData)).toBe(false);
  });

  const portPath1 = "/dev/ttyXURSB0";
  test(`[isValidPortPath] 1. When port path is valid (${portPath1}), it should return true`, () => {
    expect(isValidPortPath(portPath1)).toBe(true);
  });

  const portPath2 = "/dev/ttyACM0";
  test(`[isValidPortPath] 2. When port path is valid (${portPath2}), it should return true`, () => {
    expect(isValidPortPath(portPath2)).toBe(true);
  });

  const portPath3 = "/dev/tatyUSB0";
  test(`[isValidPortPath] 3. When port path is invalid (${portPath3}), it should return false`, () => {
    expect(isValidPortPath(portPath3)).toBe(false);
  });

  const portPath4 = "dev/ttyXURSB0";
  test(`[isValidPortPath] 4. When port path is invalid (${portPath4}), it should return false`, () => {
    expect(isValidPortPath(portPath4)).toBe(false);
  });

  const portPath5 = { portPath: "dev/ttyXURSB0" };
  test(`[isValidPortPath] 5. When port path is invalid (${portPath5}), it should return false`, () => {
    expect(isValidPortPath(portPath5)).toBe(false);
  });

  const portPath6 = "/invalidPath/dev/ttyXURSB0";
  test(`[isValidPortPath] 6. When port path is invalid (${portPath6}), it should return false`, () => {
    expect(isValidPortPath(portPath6)).toBe(false);
  });

  const orfrt1 = 5;
  test(`[isValidOnReadFailRetryTimes] 1. When retry times is valid (${orfrt1}), it should return true`, () => {
    expect(isValidOnReadFailRetryTimes(orfrt1)).toBe(true);
  });

  const orfrt2 = 4.7;
  test(`[isValidOnReadFailRetryTimes] 2. When retry times is invalid (${orfrt2}), it should return false`, () => {
    expect(isValidOnReadFailRetryTimes(orfrt2)).toBe(false);
  });

  const orfrt3 = -2;
  test(`[isValidOnReadFailRetryTimes] 3. When retry times is invalid (${orfrt3}), it should return false`, () => {
    expect(isValidOnReadFailRetryTimes(orfrt3)).toBe(false);
  });

  const orfrt4 = "5";
  test(`[isValidOnReadFailRetryTimes] 4. When retry times is invalid (${orfrt4} as string), it should return false`, () => {
    expect(isValidOnReadFailRetryTimes(orfrt4)).toBe(false);
  });

  const showLogs1 = true;
  test(`[isValidShowLogs] 1. When show logs is valid (${showLogs1}), it should return true`, () => {
    expect(isValidShowLogs(showLogs1)).toBe(true);
  });

  const showLogs2 = "true";
  test(`[isValidShowLogs] 2. When show logs is invalid (${showLogs2}), it should return false`, () => {
    expect(isValidShowLogs(showLogs2)).toBe(false);
  });

  const showLogs3 = { showLogs: "true" };
  test(`[isValidShowLogs] 3. When show logs is invalid (${showLogs3}), it should return false`, () => {
    expect(isValidShowLogs(showLogs3)).toBe(false);
  });

  const outputFile1 = "/Users/adalovelace";
  test(`[isValidOutputFile] 1. When output file is valid (${outputFile1}), it should return true`, () => {
    expect(isValidOutputFile(outputFile1)).toBe(true);
  });

  const outputFile2 = " /Users/adalovelace";
  test(`[isValidOutputFile] 2. When output file is invalid (${outputFile2}), it should return false`, () => {
    expect(isValidOutputFile(outputFile2)).toBe(false);
  });

  const outputFile3 = { outputFile: "/Users/adalovelace" };
  test(`[isValidOutputFile] 3. When output file is invalid (${outputFile3}), it should return false`, () => {
    expect(isValidOutputFile(outputFile3)).toBe(false);
  });

  const registerAddress1 = "0x0201";
  test(`[isValidAddress] 1. When register address is valid (${registerAddress1}), it should return true`, () => {
    expect(isValidAddress(registerAddress1)).toBe(true);
  });

  const registerAddress2 = "11F3";
  test(`[isValidAddress] 2. When register address is valid (${registerAddress2}), it should return true`, () => {
    expect(isValidAddress(registerAddress2)).toBe(true);
  });

  const registerAddress3 = "0x0AF9";
  test(`[isValidAddress] 3. When register address is valid (${registerAddress3}), it should return true`, () => {
    expect(isValidAddress(registerAddress3)).toBe(true);
  });

  const registerAddress4 = "0xf20201";
  test(`[isValidAddress] 4. When register address is invalid (${registerAddress4}), it should return false`, () => {
    expect(isValidAddress(registerAddress4)).toBe(false);
  });

  const registerAddress5 = "-4f35f3";
  test(`[isValidAddress] 5. When register address is invalid (${registerAddress5}), it should return false`, () => {
    expect(isValidAddress(registerAddress5)).toBe(false);
  });

  const registerAddress6 = "52.61";
  test(`[isValidAddress] 6. When register address is invalid (${registerAddress6}), it should return false`, () => {
    expect(isValidAddress(registerAddress6)).toBe(false);
  });

  const varName1 = "potênciaDoMotor1";
  test(`[isValidVariableName] 1. When variable name is valid (${varName1}), it should return true`, () => {
    expect(isValidVariableName(varName1)).toBe(true);
  });

  const varName2 = "tensão-da-rede-4";
  test(`[isValidVariableName] 2. When variable name is valid (${varName2}), it should return true`, () => {
    expect(isValidVariableName(varName2)).toBe(true);
  });

  const varName3 = { variableName: "deviceTemperature" };
  test(`[isValidVariableName] 2. When variable name is invalid (${varName3}), it should return false`, () => {
    expect(isValidVariableName(varName3)).toBe(false);
  });

  const ratio1 = 1.634;
  test(`[isValidRatio] 1. When register address is valid (${ratio1}), it should return true`, () => {
    expect(isValidRatio(ratio1)).toBe(true);
  });

  const ratio2 = "10";
  test(`[isValidRatio] 2. When register address is invalid (${ratio2}), it should return false`, () => {
    expect(isValidRatio(ratio2)).toBe(false);
  });

  const functionCodde1 = "03";
  test(`[isValidFunctionCode] 1. When function code is valid (${functionCodde1}), it should return true`, () => {
    expect(isValidFunctionCode(functionCodde1)).toBe(true);
  });

  const functionCodde2 = 3;
  test(`[isValidFunctionCode] 1. When function code is invalid (${functionCodde2}), it should return false`, () => {
    expect(isValidFunctionCode(functionCodde2)).toBe(false);
  });

  const register1: RegisterType = {
    address: "0x2524",
    functionCode: "02",
    variableName: "temperatureInsideDevice",
  };
  test(`[isValidRegister] 1. When register is valid (${register1}), it should return true`, () => {
    expect(isValidRegister(register1)).toBe(true);
  });

  const register2: RegisterType = {
    address: "2524",
    functionCode: "01",
    variableName: "tensionOnGate2",
    ratio: 0.1,
  };
  test(`[isValidRegister] 2. When register is valid (${register2}), it should return true`, () => {
    expect(isValidRegister(register2)).toBe(true);
  });

  const register3: unknown = {
    address: "0x0f12",
    functionCode: "04",
    variableName: "PotênciaMotor3",
    ratio: 10,
    unusefulVar: "this var will not be used...",
  };
  test(`[isValidRegister] 3. When register is valid (${register3}), it should return true`, () => {
    expect(isValidRegister(register3)).toBe(true);
  });

  const register4: unknown = {
    address: "0x0f12",
    functionCode: 4,
    variableName: "PotênciaMotor3",
    ratio: 10,
    unusefulVar: "this var will not be used...",
  };
  test(`[isValidRegister] 4. When register is invalid (${register4}), it should return false`, () => {
    expect(isValidRegister(register4)).toBe(false);
  });

  const register5: unknown = {
    address: "0xf209f4ff",
    functionCode: "04",
    variableName: "PotênciaMotor3",
    ratio: 10,
    unusefulVar: "this var will not be used...",
  };
  test(`[isValidRegister] 5. When register is invalid (${register5}), it should return false`, () => {
    expect(isValidRegister(register5)).toBe(false);
  });

  const register6: unknown = {
    address: "0x00f2",
    functionCode: "04",
    variableName: "PotênciaMotor3",
    ratio: "10",
    unusefulVar: "this var will not be used...",
  };
  test(`[isValidRegister] 6. When register is invalid (${register6}), it should return false`, () => {
    expect(isValidRegister(register6)).toBe(false);
  });

  const registers1: RegisterType[] = [
    {
      address: "0x00f2",
      functionCode: "03",
      variableName: "PotênciaMotor1",
      ratio: 10,
    },
    {
      address: "0x00f3",
      functionCode: "03",
      variableName: "PotênciaMotor2",
      ratio: 10,
    },
    {
      address: "0x00f4",
      functionCode: "03",
      variableName: "PotênciaMotor3",
      ratio: 10,
    },
    {
      address: "0x00f5",
      functionCode: "03",
      variableName: "PotênciaMotor4",
      ratio: 10,
    },
  ];
  test(`[areValidRegisters] 1. When registers are valid, it should return true`, () => {
    expect(areValidRegisters(registers1)).toBe(true);
  });

  const registers2: unknown[] = [
    {
      address: "0x00f2",
      functionCode: "03",
      variableName: "PotênciaMotor1",
      ratio: 10,
    },
    {
      address: "0x00f3",
      functionCode: "03",
      variableName: "PotênciaMotor2",
      ratio: 10,
    },
    {
      address: "0x00f4",
      functionCode: "03",
      variableName: "PotênciaMotor3",
      ratio: 10,
    },
    {
      address: "0x00f5",
      functionCode: "03",
      variableName: "PotênciaMotor4",
      ratio: "10",
    },
  ];
  test(`[areValidRegisters] 2. If one of the registers is invalid, it should return false`, () => {
    expect(areValidRegisters(registers2)).toBe(false);
  });

  const config1: ConfigType = {
    portPath: "/dev/ttyUSB0",
    baudRate: "115200",
    cron: "*/5 * * * *",
    onReadFailRetryTimes: 3,
    outputFile: "/Users/adalovelace/modbusReadData/hydraulic-engine.json",
    slaveID: 1,
    showLogs: true,
    registers: [
      {
        address: "0x00f2",
        functionCode: "03",
        variableName: "PotênciaMotor1",
        ratio: 10,
      },
      {
        address: "0x00f3",
        functionCode: "03",
        variableName: "PotênciaMotor2",
        ratio: 10,
      },
      {
        address: "0x00f4",
        functionCode: "03",
        variableName: "PotênciaMotor3",
        ratio: 10,
      },
      {
        address: "0x00f5",
        functionCode: "03",
        variableName: "PotênciaMotor4",
        ratio: 10,
      },
    ],
  };
  test(`[isValidConfig] 1. When config is valid, it should return true`, () => {
    expect(isValidConfig(config1)).toBe(true);
  });

  const config2: unknown = {
    portPath: "/dev/ttyUSB0",
    baudRate: "115200",
    onReadFailRetryTimes: 3,
    outputFile: "/Users/adalovelace/modbusReadData/hydraulic-engine.json",
    slaveID: 3,
    showLogs: true,
    registers: [
      {
        address: "0x00f2",
        functionCode: "03",
        variableName: "PotênciaMotor1",
        ratio: 10,
      },
      {
        address: "0x00f3",
        functionCode: "03",
        variableName: "PotênciaMotor2",
        ratio: 10,
      },
      {
        address: "0x00f4",
        functionCode: "03",
        variableName: "PotênciaMotor3",
        ratio: 10,
      },
      {
        address: "0x00f5",
        functionCode: "03",
        variableName: "PotênciaMotor4",
        ratio: 10,
      },
    ],
  };
  test(`[isValidConfig] 2. When config is valid but property 'cron' is not defined, it should return true`, () => {
    expect(isValidConfig(config2)).toBe(true);
  });

  const config3: unknown = {
    portPath: "/dev/ttyUSB0",
    baudRate: "115200",
    cron: "*/5 * * * *",
    onReadFailRetryTimes: 3,
    outputFile: "/Users/adalovelace/modbusReadData/hydraulic-engine.json",
    slaveID: "1",
    showLogs: true,
    registers: [
      {
        address: "0x00f2",
        functionCode: "03",
        variableName: "PotênciaMotor1",
        ratio: 10,
      },
      {
        address: "0x00f3",
        functionCode: "03",
        variableName: "PotênciaMotor2",
        ratio: 10,
      },
      {
        address: "0x00f4",
        functionCode: "03",
        variableName: "PotênciaMotor3",
        ratio: 10,
      },
      {
        address: "0x00f5",
        functionCode: "03",
        variableName: "PotênciaMotor4",
        ratio: 10,
      },
    ],
  };
  test(`[isValidConfig] 3. When config is invalid, it should return false`, () => {
    expect(isValidConfig(config3)).toBe(false);
  });
});
