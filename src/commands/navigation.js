import os from "os";
import fsPromises from "fs/promises";
import { messages } from "../utils/messages.js";
import path from "path";

const lang = "fr";
const t = messages[lang];

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
      throw new Error(t.operationFailed);
    }
  },

  up(currDir) {
    const parentDir = path.dirname(currDir);
    if (currDir === os.homedir()) {
      return currDir;
    } else {
      return parentDir;
    }
  },

  async cd(currDir, targetDir) {
    console.log(targetDir);
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
