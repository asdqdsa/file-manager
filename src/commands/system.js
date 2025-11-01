import os from "node:os";
import { t } from "../i18n/index.js";

export const osCommands = async (flag) => {
  switch (flag) {
    case "--EOL":
      console.log(JSON.stringify(os.EOL));
      break;

    case "--cpus":
      const cpus = os.cpus();
      console.log("CORES: ", cpus.length);
      for (const cpu of cpus) {
        console.log(
          `${cpu.model.trim()} -- ${(cpu.speed / 1000).toFixed(2)} GHz`,
        );
      }
      break;

    case "--homedir":
      console.log(os.homedir());
      break;

    case "--username":
      console.log(os.userInfo().username);
      break;

    case "--architecture":
      console.log(os.arch());
      break;

    default:
      console.error(t.invalidInput);
      break;
  }
};
