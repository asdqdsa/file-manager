import os from "os";
import readline from "readline";
import { navigationCommands } from "./commands/navigation.js";
import { messages } from "./utils/messages.js";
import { parseArgs } from "./utils/parseArgs.js";

const lang = "fr";
const t = messages[lang];

const user = parseArgs();

if (!user) {
  console.error(t.invalidInput);
  process.exit(1);
}

console.log(t.welcome(user));

let currDir = os.homedir();
const printDir = (dir = currDir) => console.log(t.cwd(dir));

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

printDir();
rl.prompt();

rl.on("line", async (input) => {
  const [command, ...args] = input.trim().split(/\s+/);
  if (command === ".exit") {
    console.log(t.goodbye(user));
    rl.close();
    process.exit();
  } else if (command === "ls") {
    await navigationCommands.ls(currDir);
  } else if (command === "up") {
    currDir = navigationCommands.up(currDir);
  } else if (command === "cd") {
    currDir = (await navigationCommands.cd(currDir, args[0])) || currDir;
  } else {
    console.error(t.operationFailed);
  }
  printDir(currDir);
});

rl.on("SIGINT", () => {
  console.log(t.goodbye(user));
  rl.close();
  process.exit();
});
