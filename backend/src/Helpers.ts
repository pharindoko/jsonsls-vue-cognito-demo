import fs from "fs-extra";
import * as path from "path";
const util = require("util");
const exec = util.promisify(require("child_process").exec);
export class Helpers {
  static readFileSync(directoryPath: string): string {
    const normalizedPath = path.normalize(directoryPath);
    if (!fs.existsSync(normalizedPath)) {
      throw new Error("file" + normalizedPath + " does not exist");
    } else {
      const file = fs.readFileSync(normalizedPath, "UTF-8");
      return file;
    }
  }
}
