import crypto from "node:crypto";
import { createReadStream } from "node:fs";
import path, { isAbsolute } from "node:path";
import { t } from "../i18n/index.js";

export const hashCommand = async (currDir, srcFile) => {
  if (!srcFile) {
    console.error(t.invalidInput);
    return;
  }

  const src = path.normalize(
    isAbsolute(srcFile) ? srcFile : path.join(currDir, srcFile),
  );

  try {
    const hash = crypto.createHash("sha256");
    const readable = createReadStream(src);

    readable.on("error", () => console.error(t.operationFailed));
    readable.on("data", (chunk) => hash.update(chunk));
    readable.on("end", () => console.log(hash.digest("hex")));
  } catch {
    console.error(t.operationFailed);
  }
};
