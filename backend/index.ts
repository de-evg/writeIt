import { config } from "dotenv";

import { bot } from "./telegram";

config();

bot().start();
