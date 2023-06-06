import { isValidConfig } from "../validations";
import Console from "./Console";
import Filesys from "./Filesys";

const console = new Console("Config");

export default class Config {
  private fs = new Filesys();

  /**
   * Default path for reading the user's defined configuration file.
   */
  private defaultConfigPath = `${process.env.HOME}/.modbusreaderrc.json`;
  /**
   * Default configuration values. Those values will fill the fields which were not defined by the user.
   */
  private defaultConfiguration: Partial<ConfigType> = {
    baudRate: "9600",
    onReadFailRetryTimes: 3,
    outputFile: `${process.env.HOME}/.modbusreader.data.json`,
    slaveID: 1,
    showLogs: true,
  };

  /**
   * Loads the configuration and returns the object if it's valid, otherwise, throws an error.
   * @returns
   */
  async loadConfiguration(): Promise<ConfigType> {
    console.contextLog("Loading configuration file...");

    const fetchedConfig = await this.fs.fetchObjectOnJSONFile<ConfigType>(
      this.defaultConfigPath
    );

    console.contextLog("Filling empty fields with default values...");

    const finalConfig: ConfigType = {
      ...this.defaultConfiguration,
      ...fetchedConfig,
    };

    console.contextLog("Validating configuration file...");

    if (!isValidConfig(finalConfig)) {
      console.contextLog("Found invalid data on configuration file!");

      throw new Error("Invalid configuration file!");
    }

    console.contextLog("Configuration validated successfully!");

    console.contextLog("Loaded configuration:", finalConfig);

    return finalConfig;
  }
}
