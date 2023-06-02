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
}
