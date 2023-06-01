export default class Sys {
  /**
   * Constant determining which platforms are valid to run the application.
   */
  private validPlatforms: NodeJS.Platform[] = ["linux"];

  /**
   * Checks if the given platform is a valid one to run the application.
   *
   * If no platform is given, then it'll be used the current system platform.
   * @returns
   */
  isValidOS = (platform?: NodeJS.Platform) => {
    const currentPlatform = platform || process.platform;

    for (let index = 0; index < this.validPlatforms.length; index++) {
      const validPlatform = this.validPlatforms[index];

      if (validPlatform === currentPlatform) return true;
    }

    return false;
  };
}
