import cp from "child_process";
import Filesys from "./Filesys";

describe("Filesys class test suite", () => {
  test("[appendObjectOnJSONFile] 1. When the given file path exists and it's content is an empty array, it should append normally, containing only the data requested to be appended", async () => {
    const filePath = `.appendObjectOnJSONFile1.json`;
    const contentAlreadyOnFile: unknown[] = [];

    const fs = new Filesys();

    await fs.writeObjectOnJSONFile(contentAlreadyOnFile, filePath);

    const dataToBeSaved = { a: "key a" };
    const expectedFinalJSONSaved = [dataToBeSaved];

    await fs.appendObjectOnJSONFile(dataToBeSaved, filePath);

    const finalJSONSaved = await fs.fetchObjectOnJSONFile<unknown[]>(filePath);

    expect(finalJSONSaved.at(-1)).toEqual(expectedFinalJSONSaved.at(-1));
    expect(finalJSONSaved.length === 1).toBe(true);

    cp.exec(`rm -fr ${filePath}`);
  });

  test("[appendObjectOnJSONFile] 2. When the file exists and it's content is a filled array, it should append normally, containing the data requested to be appended at the last position of the array", async () => {
    const filePath = `.appendObjectOnJSONFile2.json`;
    const contentAlreadyOnFile: unknown[] = [{ fill: "red" }];

    const fs = new Filesys();

    await fs.writeObjectOnJSONFile(contentAlreadyOnFile, filePath);

    const dataToBeSaved = { fill: "green" };

    contentAlreadyOnFile.push(dataToBeSaved);

    const expectedFinalJSONSaved = contentAlreadyOnFile;

    await fs.appendObjectOnJSONFile(dataToBeSaved, filePath);

    const finalJSONSaved = await fs.fetchObjectOnJSONFile<unknown[]>(filePath);

    expect(finalJSONSaved.at(-1)).toEqual(expectedFinalJSONSaved.at(-1));
    expect(finalJSONSaved.length > 1).toEqual(true);

    cp.exec(`rm -fr ${filePath}`);
  });

  test("[appendObjectOnJSONFile] 3. When the file exists and it's content is not an array, it should throw an error", async () => {
    const filePath = `.appendObjectOnJSONFile3.json`;
    const contentAlreadyOnFile: unknown = { fill: "red" };

    const fs = new Filesys();

    await fs.writeObjectOnJSONFile(contentAlreadyOnFile, filePath);

    const dataToBeSaved = { fill: "green" };

    await expect(
      async () => await fs.appendObjectOnJSONFile(dataToBeSaved, filePath)
    ).rejects.toThrow();

    cp.exec(`rm -fr ${filePath}`);
  });

  test("[appendObjectOnJSONFile] 4. When the file does not exists, it should create a new file containing only the data requested to be appended in an array", async () => {
    const filePath = `.appendObjectOnJSONFile4.json`;

    const fs = new Filesys();

    const dataToBeSaved = { a: "key a" };
    const expectedFinalJSONSaved = [dataToBeSaved];

    await fs.appendObjectOnJSONFile(dataToBeSaved, filePath);

    const finalJSONSaved = await fs.fetchObjectOnJSONFile<unknown[]>(filePath);

    expect(finalJSONSaved.at(-1)).toEqual(expectedFinalJSONSaved.at(-1));
    expect(finalJSONSaved.length === 1).toBe(true);

    cp.exec(`rm -fr ${filePath}`);
  });

  test("[fileExists] 1. When the file does not exists, or occurs any problem during the check, it should return false", async () => {
    const filePath = `.fileExists1.json`;

    const fs = new Filesys();

    const fileExists = fs.fileExists(filePath);

    expect(fileExists).toBe(false);
  });

  test("[fileExists] 2. When the file exists it should return true", async () => {
    const filePath = `.fileExists2.json`;
    const contentAlreadyOnFile: unknown = null;

    const fs = new Filesys();

    await fs.writeObjectOnJSONFile(contentAlreadyOnFile, filePath);

    const fileExists = fs.fileExists(filePath);

    expect(fileExists).toBe(true);

    cp.exec(`rm -fr ${filePath}`);
  });
});
