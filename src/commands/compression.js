import { createReadStream, createWriteStream } from "node:fs";
import path, { isAbsolute } from "node:path";
import { pipeline } from "node:stream/promises";
import zlib from "node:zlib";
import { messages } from "../utils/messages.js";

const lang = "fr";
const t = messages[lang];

export const zipCommands = {
  async compress(currDir, srcDir, targetDir) {
    if (!srcDir || !targetDir) {
      console.error(t.invalidInput);
      return;
    }

    const src = path.normalize(
      isAbsolute(srcDir) ? srcDir : path.join(currDir, srcDir),
    );

    const target = path.normalize(
      isAbsolute(targetDir) ? targetDir : path.join(currDir, targetDir),
    );

    try {
      const readable = createReadStream(src);
      const writable = createWriteStream(target);
      const zip = zlib.createBrotliCompress();

      await pipeline(readable, zip, writable);
      console.log(t.operationSuccess);
    } catch {
      console.error(t.invalidInput);
    }
  },

  async decompress(currDir, srcDir, targetDir) {
    if (!srcDir || !targetDir) {
      console.error(t.invalidInput);
      return;
    }

    const src = path.normalize(
      isAbsolute(srcDir) ? srcDir : path.join(currDir, srcDir),
    );

    const target = path.normalize(
      isAbsolute(targetDir) ? targetDir : path.join(currDir, targetDir),
    );

    try {
      const readable = createReadStream(src);
      const writable = createWriteStream(target);
      const unzip = zlib.createBrotliDecompress();

      await pipeline(readable, unzip, writable);
      console.log(t.operationSuccess);
    } catch {
      console.error(t.operationFailed);
    }
  },
};
