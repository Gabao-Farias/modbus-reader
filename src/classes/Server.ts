import Console from "./Console";
import Filesys from "./Filesys";
import Modbus from "./Modbus";

const console = new Console("Server");

export default class Server {
  private cf: ConfigType;
  private mb: Modbus;
  private fs: Filesys;

  constructor(config: ConfigType) {
    this.cf = config;
    this.mb = new Modbus(config);
    this.fs = new Filesys();
  }

  async startReadIteration() {
    console.contextLog(`Starting read iteration...`);

    await this.mb.connectDevice();

    const { registers } = this.cf;

    const data = {
      timestamp: String(Number(new Date())),
    };

    for (let index = 0; index < registers.length; index++) {
      const register = registers[index];

      const { variableName } = register;

      const result = await this.readRegisterData(register);

      Object.assign(data, { [variableName]: result });
    }

    this.mb.closeConnection();

    this.saveData(data);
  }

  async readRegisterData(register: RegisterType) {
    const { onReadFailRetryTimes } = this.cf;

    for (
      let timesRetryed = 0;
      timesRetryed <= onReadFailRetryTimes;
      timesRetryed++
    ) {
      const { address, ratio, variableName } = register;

      console.contextLog(
        `Reading register '${address}', variable name ${variableName}...`
      );

      try {
        const result = await this.mb.readData(register);

        console.contextLog(`Successfully read register '${address}'!`);

        const processedResult = ratio ? (result as number) * ratio : result;

        return processedResult;
      } catch (error) {
        console.contextLog(`Failed on read register '${address}'!`);
        console.contextLog(`Retryed ${timesRetryed} times`);
        console.contextLog(`Retrying...`);
      }
    }

    console.contextLog(
      `Failed to read register after ${onReadFailRetryTimes} times, assigning null value!`
    );

    return null;
  }

  async saveData(data: unknown) {
    console.contextLog(`Saving data...`);

    const { cron, outputFile } = this.cf;

    if (cron) {
      this.fs.appendObjectOnJSONFile(data, outputFile);
    } else {
      this.fs.writeObjectOnJSONFile(data, outputFile);
    }

    console.contextLog(`Data saved successfully!`);
  }
}
