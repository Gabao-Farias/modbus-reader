import ModbusRTU from "modbus-serial";
import { MODBUS_READ_FUNCTIONS_TO_FUNCTIONS_NAMES } from "../consts";
import { hexToDec } from "../utils";
import Console from "./Console";

const console = new Console("Modbus");

export default class Modbus {
  private bus: ModbusRTU;
  private config: ConfigType;

  constructor(config: ConfigType) {
    this.config = config;

    this.bus = new ModbusRTU();

    this.bus.setID(config.slaveID as number);
  }

  /**
   * Opens connection with device.
   */
  async connectDevice() {
    const { portPath, baudRate } = this.config;

    console.contextLog(`Connecting Modbus device at '${portPath}'...`);

    await this.bus.connectRTUBuffered(portPath, {
      baudRate: Number(baudRate),
    });

    console.contextLog(`Device successfully connected at '${portPath}'!`);
  }

  /**
   * Reads data using the given params.
   * @param param0
   */
  async readData({
    address,
    functionCode,
  }: ModbusReadProps): Promise<number | boolean> {
    const functionName = MODBUS_READ_FUNCTIONS_TO_FUNCTIONS_NAMES[functionCode];
    const numberAddress = hexToDec(address);

    console.contextLog(
      `Reading data at address '${address}' using function '${functionName}'...`
    );

    const result = (await this.bus[functionName](numberAddress, 1)).data[0];

    console.contextLog(`Data read successfully at address ${address}!`);

    return result;
  }

  /**
   * Close the modbus connection.
   */
  closeConnection(callBack: () => void) {
    console.contextLog(`Closing Modbus connection...`);

    this.bus.close(callBack);

    console.contextLog(`Modbus connection closed successfully!`);
  }
}
