import { Context, session, Telegraf } from "telegraf";
import { message } from "telegraf/filters";

import { Command, Message } from "./constants";

type SessionData = {
  telegramId: number;
};

type CustomContext = Context & {
  session?: SessionData;
};

class WriteItBot {
  static instance: WriteItBot;
  private bot: null | Telegraf<CustomContext>;

  static getInstance() {
    if (WriteItBot.instance) {
      return WriteItBot.instance;
    }

    WriteItBot.instance = new WriteItBot();

    return WriteItBot.instance;
  }

  constructor() {
    this.init();
  }

  private init() {
    this.bot = new Telegraf<CustomContext>(process.env.TELEGRAM_BOT_TOKEN);
    this.bot.use(session());
    this.bot.start(this.onStart);
    this.bot.command(Command.HELP, this.onCommandHelp);
    this.bot.command(Command.SUBSCRIPTION, this.onCommandSubscription);
    this.bot.on(message(Message.TEXT), this.onMessageText);
  }

  private async onStart(ctx) {
    ctx.reply("Welcome! Send me a message.");
    ctx.session ??= { telegramId: ctx.from.id };
    await ctx.reply(`Seen ${ctx.session.telegramId} messages.`);
  }

  private async onCommandHelp(ctx) {
    await ctx.reply(
      "To get help, contact our support team at support@example.com",
    );
  }

  private async onCommandSubscription(ctx) {
    ctx.session ??= { telegramId: ctx.from.id };
    await ctx.reply(`Seen ${ctx.session.telegramId} messages.`);
  }

  private async onMessageText(ctx) {
    await ctx.reply(`You say ${ctx.session.telegramId} messages.`);
  }

  public start() {
    this.bot
      .launch({
        webhook: {
          domain: "https://de-evg.github.io/writeIt/",
        },
      })
      .then(() => {
        console.log("Bot was started");
      });
  }
}

const bot = WriteItBot.getInstance;
export { bot };
