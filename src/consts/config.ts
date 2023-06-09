export const CRON_VALIDATION_REGEX =
  /^((?:\*|[0-5]?[0-9](?:(?:-[0-5]?[0-9])|(?:,[0-5]?[0-9])+)?)(?:\/[0-9]+)?)\s+((?:\*|(?:1?[0-9]|2[0-3])(?:(?:-(?:1?[0-9]|2[0-3]))|(?:,(?:1?[0-9]|2[0-3]))+)?)(?:\/[0-9]+)?)\s+((?:\*|(?:[1-9]|[1-2][0-9]|3[0-1])(?:(?:-(?:[1-9]|[1-2][0-9]|3[0-1]))|(?:,(?:[1-9]|[1-2][0-9]|3[0-1]))+)?)(?:\/[0-9]+)?)\s+((?:\*|(?:[1-9]|1[0-2])(?:(?:-(?:[1-9]|1[0-2]))|(?:,(?:[1-9]|1[0-2]))+)?)(?:\/[0-9]+)?)\s+((?:\*|[0-7](?:-[0-7]|(?:,[0-7])+)?)(?:\/[0-9]+)?)$/;
export const PORT_PATH_VALIDATION_REGEX = /^\/dev\/tty.+$/;
export const LINUX_PATH_VALIDATION_REGEX = /^(\/[^/ ]*)+\/?$/;
export const HEX_VALIDATION_REGEX = /^(0[xX])?([0-9a-fA-F])+$/;

/**
 * Default file path where the user should create the configuration file.
 */
export const DEFAULT_CONFIG_PATH = `${process.env.HOME}/.modbusreaderrc.json`;
