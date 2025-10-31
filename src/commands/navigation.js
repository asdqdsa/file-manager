import fsPromises from "fs/promises";
import { messages } from "../utils/messages.js";

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
};
