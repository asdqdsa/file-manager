import { createReadStream, createWriteStream } from "node:fs";
import fsPromises from "node:fs/promises";
import path, { isAbsolute } from "node:path";
import { messages } from "../utils/messages.js";

const lang = "fr";
const t = messages[lang];

export const filesCommands = {
  async cat(currDir, targetDir) {
    if (!targetDir) {
      console.error(t.invalidInput);
      return;
    }

    const src = path.normalize(
      isAbsolute(targetDir) ? targetDir : path.join(currDir, targetDir),
    );

    try {
      const stream = createReadStream(src);
      stream.on("error", () => console.error(t.operationFailed));
      stream.on("data", (chunk) => process.stdout.write(chunk));
      stream.on("end", () => process.stdout.write("\n"));
    } catch {
      console.error(t.operationFailed);
    }
  },

  async copy(currDir, srcName, destName) {
    if (!srcName || !destName) {
      console.error(t.invalidInput);
      return;
    }

    const srcPath = path.normalize(
      isAbsolute(srcName) ? srcName : path.join(currDir, srcName),
    );

    const destPath = path.normalize(
      isAbsolute(destName) ? destName : path.join(currDir, destName),
    );

    return new Promise((resolve, reject) => {
      let readable, writeble;

      try {
        readable = createReadStream(srcPath);
        writeble = createWriteStream(destPath, { flags: "wx" });
      } catch (err) {
        console.error(t.operationFailed);
        reject(err);
        return;
      }

      readable.on("error", (err) => {
        console.error(t.operationFailed);
        reject(err);
      });

      writeble.on("error", (err) => {
        if (err.code === "EEXIST") console.error(t.operationFailed);
        else console.error(t.operationFailed);
        resolve();
      });

      writeble.on("finish", () => {
        console.log(t.operationSuccess);
        resolve();
      });

      readable.pipe(writeble);
    });
  },

  async move(currDir, srcName, destName) {
    try {
      await this.copy(currDir, srcName, destName);
      await this.remove(currDir, srcName);
      console.log(t.operationSuccess);
    } catch {
      console.error(t.operationFailed);
    }
  },

  async touch(currDir, targetDir) {
    if (!targetDir) {
      console.error(t.invalidInput);
      return;
    }

    const target = path.normalize(
      isAbsolute(targetDir) ? targetDir : path.join(currDir, targetDir),
    );

    try {
      await fsPromises.writeFile(target, "", { flag: "wx" });
      console.log(t.operationSuccess);
    } catch {
      console.error(t.operationFailed);
    }
  },

  async remove(currDir, targetDir) {
    if (!targetDir) {
      console.error(t.invalidInput);
      return;
    }

    const target = path.normalize(
      isAbsolute(targetDir) ? targetDir : path.join(currDir, targetDir),
    );

    try {
      await fsPromises.unlink(target);
      console.log(t.operationSuccess);
    } catch {
      console.error(t.operationFailed);
    }
  },

  async mkdir(currDir, targetDir) {
    if (!targetDir) {
      console.error(t.invalidInput);
      return;
    }

    const dirPath = path.normalize(
      isAbsolute(targetDir) ? targetDir : path.join(currDir, targetDir),
    );

    try {
      await fsPromises.mkdir(dirPath);
      console.log(t.operationSuccess);
    } catch {
      console.error(t.operationFailed);
    }
  },

  async rmdir(currDir, targetDir) {
    if (!targetDir) {
      console.error(t.invalidInput);
      return;
    }

    const dirPath = path.normalize(
      isAbsolute(targetDir) ? targetDir : path.join(currDir, targetDir),
    );

    try {
      await fsPromises.rmdir(dirPath);
      console.log(t.operationSuccess);
    } catch {
      console.error(t.operationFailed);
    }
  },

  async rename(currDir, srcName, newName) {
    if (!srcName || !newName) {
      console.error(t.invalidInput);
      return;
    }

    const currPath = path.normalize(
      isAbsolute(srcName) ? srcName : path.join(currDir, srcName),
    );
    const newPath = path.normalize(
      isAbsolute(newName) ? newName : path.join(currDir, newName),
    );

    try {
      await fsPromises.rename(currPath, newPath);
      console.log(t.operationSuccess);
    } catch {
      console.error(t.operationFailed);
    }
  },

  async copyFs(currDir, srcName, destName) {
    if (!srcName || !destName) {
      console.error(t.invalidInput);
      return;
    }

    const srcPath = path.normalize(
      isAbsolute(srcName) ? srcName : path.join(currDir, srcName),
    );

    const destPath = path.normalize(
      isAbsolute(destName) ? destName : path.join(currDir, destName),
    );

    try {
      await fsPromises.cp(srcPath, destPath, {
        errorOnExit: true,
        force: false,
        recursive: true,
      });
      console.log(t.operationSuccess);
    } catch {
      console.error(t.operationFailed);
    }
  },
};
