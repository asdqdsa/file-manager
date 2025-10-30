export const parseArgs = () => {
  const arg = process.argv.slice(2).find((a) => a.startsWith("--username="));
  return arg ? arg.split("=")[1] : null;
};
