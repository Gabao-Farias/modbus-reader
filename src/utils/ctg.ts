/**
 * Checks if given data is type of Register Type.
 * @param register
 * @returns
 */
export const isTypeOfRegisterType = (
  register: unknown
): register is RegisterType => {
  return (
    typeof register === "object" &&
    register !== null &&
    "variableName" in register &&
    "address" in register &&
    "functionCode" in register
  );
};
