import os from "node:os";
import readline from "node:readline";
import { filesCommands } from "./commands/files.js";
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
  if (command === ".exit" || command === ":q") {
    console.log(t.goodbye(user));
    rl.close();
    process.exit();
  } else if (command === "ls") {
    await navigationCommands.ls(currDir);
  } else if (command === "up") {
    currDir = navigationCommands.up(currDir);
  } else if (command === "cd") {
    currDir = (await navigationCommands.cd(currDir, args[0])) || currDir;
  } else if (command === "cat") {
    await filesCommands.cat(currDir, args[0]);
  } else if (command === "add" || command === "touch") {
    await filesCommands.touch(currDir, args[0]);
  } else if (command === "rm") {
    await filesCommands.remove(currDir, args[0]);
  } else if (command === "mkdir") {
    await filesCommands.mkdir(currDir, args[0]);
  } else if (command === "rmdir") {
    await filesCommands.rmdir(currDir, args[0]);
  } else if (command === "rn") {
    await filesCommands.rename(currDir, args[0], args[1]);
  } else if (command === "cp") {
    await filesCommands.copy(currDir, args[0], args[1]);
  } else if (command === "mv") {
    await filesCommands.move(currDir, args[0], args[1]);
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
