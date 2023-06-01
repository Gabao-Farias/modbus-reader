import type * as SysClass from "./Sys";
const Sys = jest.requireActual<typeof SysClass>("./Sys");

describe("Sys class test suite", () => {
  test("1. Checks if linux is a valid platform", () => {
    const sys = new Sys.default();

    expect(sys.isValidOS("linux")).toBe(true);
  });

  test("2. Checks if darwin is a valid platform", () => {
    const sys = new Sys.default();

    expect(sys.isValidOS("darwin")).toBe(false);
  });

  test("3. Checks if win32 is a valid platform", () => {
    const sys = new Sys.default();

    expect(sys.isValidOS("win32")).toBe(false);
  });
});
