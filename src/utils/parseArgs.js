export const parseArgs = () => {
  const args = process.argv.slice(2);
  const userArg = args.find((a) => a.startsWith("--username="));
  const langArg = args.find((a) => a.startsWith("--lang="));

  const user = userArg ? userArg.split("=")[1] : "anonymous";
  const lang = langArg ? langArg.split("=")[1] : "en";

  return { user, lang };
};
