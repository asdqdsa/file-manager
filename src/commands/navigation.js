import fsPromises from "fs/promises";
import { messages } from "../utils/messages.js";

const lang = "fr";
const t = messages[lang];

export const navigationCommands = {
  async ls(currDir) {
    try {
      const files = await fsPromises.readdir(currDir, { withFileTypes: true });
      console.table(
        files.map((file) => ({
          Name: file.name,
          Type: file.isFile() ? "file" : "directory",
        })),
      );
    } catch {
      throw new Error(t.operationFailed);
    }
  },
};
