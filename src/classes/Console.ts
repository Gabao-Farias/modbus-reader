declare type ConsoleContexts =
  | "No Context"
  | "Filesys"
  | "Config"
  | "Modbus"
  | "Server";

export default class Console {
  private context: ConsoleContexts;

  constructor(context: ConsoleContexts = "No Context") {
    this.context = context;
  }

  contextLog(message: string, ...optionalParams: unknown[]) {
    const contextMessage = `[${this.context}] - ${message}`;

    console.log(contextMessage, ...optionalParams);
  }
}
