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
const printDir = () => console.log(t.cwd(currDir));

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

printDir();
rl.prompt();

rl.on("line", async (input) => {
  const command = input.trim();
  if (command === ".exit") {
    console.log(t.goodbye(user));
    rl.close();
    process.exit();
  } else if (command === "ls") {
    await navigationCommands.ls(currDir);
  } else {
    console.error(t.operationFailed);
    printDir();
  }
});

rl.on("SIGINT", () => {
  console.log(t.goodbye(user));
  rl.close();
  process.exit();
});
