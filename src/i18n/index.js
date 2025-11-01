import { parseArgs } from "../utils/parseArgs.js";
import { messages } from "./messages.js";

const { lang } = parseArgs();
export const t = messages[lang] || messages.en;
