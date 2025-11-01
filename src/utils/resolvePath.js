import path, { isAbsolute } from "node:path";

export const resolvePath = (dir, target) => {
  if (!target) return null;
  return path.normalize(isAbsolute(target) ? target : path.join(dir, target));
};
