import fsPromises from "fs/promises";
import path from "node:path";
import { t } from "../i18n/index.js";

export const navigationCommands = {
  async ls(currDir) {
    try {
      const files = await fsPromises.readdir(currDir, { withFileTypes: true });
      const sorted = files.toSorted((a, b) => {
        if (a.isDirectory() && !b.isDirectory()) return -1;
        if (!a.isDirectory() && b.isDirectory()) return 1;
        return a.name.localeCompare(b.name);
      });
      console.table(
        sorted.map((file) => ({
          Name: file.name,
          Type: file.isDirectory() ? "directory" : "file",
        })),
      );
    } catch {
      console.error(t.operationFailed);
    }
  },

  up(currDir) {
    if (currDir === path.parse(currDir).root) {
      return currDir;
    }
    return path.dirname(currDir);
  },

  async cd(currDir, targetDir) {
    if (!targetDir) {
      console.log(t.invalidInput);
      return;
    }

    try {
      const absolutePath = path.resolve(currDir, targetDir);
      const stats = await fsPromises.stat(absolutePath);
      if (!stats.isDirectory()) {
        throw new Error();
      }

      return path.normalize(absolutePath);
    } catch {
      console.error(t.operationFailed);
      return;
    }
  },
};
