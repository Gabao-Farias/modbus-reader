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
});
