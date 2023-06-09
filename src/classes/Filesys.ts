import fs from "fs";
import Console from "./Console";

const console = new Console("Filesys");

export default class Filesys {
  /**
   * Fetches data from a JSON file.
   * @param path
   * @returns
   */
  fetchObjectOnJSONFile<T = unknown>(path: string): Promise<T> {
    return new Promise((resolve, reject) => {
      console.contextLog(`Fetching JSON in '${path}'...`);

      fs.readFile(path, "utf8", (err, data) => {
        if (err) {
          console.contextLog(`Error during read file '${path}'`);

          reject(err);

          throw err;
        }

        const obj = JSON.parse(data);

        console.contextLog(`JSON fetched successfully in '${path}'...`);

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
    return new Promise((resolve, reject) => {
      console.contextLog(`Writing JSON in '${path}'...`);

      const serializedData = JSON.stringify(data);

      fs.writeFile(path, serializedData, (err) => {
        if (err) {
          console.contextLog(`Error during write file '${path}'`);

          reject(err);

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
    console.contextLog(`Appending JSON in '${path}'...`);

    let fileData: unknown[] = [];

    if (this.fileExists(path))
      fileData = await this.fetchObjectOnJSONFile<unknown[]>(path);

    if (!Array.isArray(fileData))
      throw new Error("Error during append data to file");

    fileData.push(data);

    await this.writeObjectOnJSONFile(fileData, path);

    console.contextLog(`JSON appended successfully in '${path}'`);
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
