import fs from "fs";
import Console from "./Console";

const console = new Console("Filesys");

export default class Filesys {
  /**
   * Fetches data from a JSON file.
   * @param path
   * @returns
   */
  fetchObjectOnJSONFile<T = unknown>(path: string): Promise<T | void> {
    return new Promise((resolve) => {
      fs.readFile(path, "utf8", (err, data) => {
        if (err) {
          console.contextLog(`Error during read file '${path}'`);

          throw err;
        }

        const obj = JSON.parse(data);

        resolve(obj as T);
      });
    });
  }

  /**
   * Writes data in a JSON file.
   * @param path
   * @returns
   */
  writeObjectOnJSONFile(data: unknown, path: string): Promise<void> {
    return new Promise((resolve) => {
      const serializedData = JSON.stringify(data);

      fs.writeFile(path, serializedData, (err) => {
        if (err) {
          console.contextLog("Error during write file");

          throw err;
        }

        console.contextLog(`JSON written successfully in '${path}'`);

        resolve();
      });
    });
  }

  /**
   * Appends data in a JSON file.
   * @param path
   * @returns
   */
  async appendObjectOnJSONFile(data: unknown, path: string): Promise<void> {
    const fileData = await this.fetchObjectOnJSONFile<unknown[]>(path);

    if (!Array.isArray(fileData))
      throw new Error("Error during append data to file");

    fileData.push(data);

    this.writeObjectOnJSONFile(fileData, path);
  }

  /**
   * Checks if the file of the given path exists.
   * @param path
   * @returns
   */
  fileExists(path: string): boolean {
    try {
      return fs.existsSync(path);
    } catch (error) {
      return false;
    }
  }
}
