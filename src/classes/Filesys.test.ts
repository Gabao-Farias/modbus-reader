import cp from "child_process";
import type * as FilesysClass from "./Filesys";
const Filesys = jest.requireActual<typeof FilesysClass>("./Filesys");

describe("Filesys class test suite", () => {
  test("[appendObjectOnJSONFile] 1. When the file exists and it's content is an empty array", async () => {
    const filePath = `.test.empty.json`;
    const contentAlreadyOnFile: unknown[] = [];

    const fs = new Filesys.default();

    await fs.writeObjectOnJSONFile(contentAlreadyOnFile, filePath);

    const dataToBeSaved = { a: "key a" };
    const expectedFinalJSONSaved = [dataToBeSaved];

    await fs.appendObjectOnJSONFile(dataToBeSaved, filePath);

    const finalJSONSaved = await fs.fetchObjectOnJSONFile<unknown[]>(filePath);

    expect(finalJSONSaved).toEqual(expectedFinalJSONSaved);

    cp.exec(`rm -fr ${filePath}`);
  });

  test("[appendObjectOnJSONFile] 2. When the file exists and it's content is a filled array", async () => {
    const filePath = `.test.filled.json`;
    const contentAlreadyOnFile: unknown[] = [{ fill: "red" }];

    const fs = new Filesys.default();

    await fs.writeObjectOnJSONFile(contentAlreadyOnFile, filePath);

    const dataToBeSaved = { fill: "green" };

    contentAlreadyOnFile.push(dataToBeSaved);

    const expectedFinalJSONSaved = contentAlreadyOnFile;

    await fs.appendObjectOnJSONFile(dataToBeSaved, filePath);

    const finalJSONSaved = await fs.fetchObjectOnJSONFile<unknown[]>(filePath);

    expect(finalJSONSaved).toEqual(expectedFinalJSONSaved);

    cp.exec(`rm -fr ${filePath}`);
  });

  test("[fileExists] 1. When the file does not exists, or occurs any problem during the check, it should return false", async () => {
    const filePath = `.test.unexistent.json`;

    const fs = new Filesys.default();

    const fileExists = fs.fileExists(filePath);

    expect(fileExists).toBe(false);
  });

  test("[fileExists] 2. When the file exists it should return true", async () => {
    const filePath = `.test.existent.json`;
    const contentAlreadyOnFile: unknown = null;

    const fs = new Filesys.default();

    await fs.writeObjectOnJSONFile(contentAlreadyOnFile, filePath);

    const fileExists = fs.fileExists(filePath);

    expect(fileExists).toBe(true);

    cp.exec(`rm -fr ${filePath}`);
  });
});
