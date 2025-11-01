import { createReadStream, createWriteStream } from "node:fs";
import path, { isAbsolute } from "node:path";
import { pipeline } from "node:stream/promises";
import zlib from "node:zlib";
import { t } from "../i18n/index.js";
import { resolvePath } from "../utils/resolvePath.js";

export const zipCommands = {
  async compress(currDir, srcDir, targetDir) {
    if (!srcDir || !targetDir) {
      console.error(t.invalidInput);
      return;
    }

    const src = resolvePath(currDir, srcDir);
    const target = resolvePath(currDir, targetDir);

    try {
      const readable = createReadStream(src);
      const writable = createWriteStream(target);
      const zip = zlib.createBrotliCompress();

      await pipeline(readable, zip, writable);
    } catch {
      console.error(t.invalidInput);
    }
  },

  async decompress(currDir, srcDir, targetDir) {
    if (!srcDir || !targetDir) {
      console.error(t.invalidInput);
      return;
    }

    const src = resolvePath(currDir, srcDir);
    const target = resolvePath(currDir, targetDir);

    try {
      const readable = createReadStream(src);
      const writable = createWriteStream(target);
      const unzip = zlib.createBrotliDecompress();

      await pipeline(readable, unzip, writable);
    } catch {
      console.error(t.operationFailed);
    }
  },
};
