const { Telegraf } = require('telegraf');

const bot = new Telegraf(process.env.BOT_TOKEN);

const SOURCE_CHAT_ID = process.env.SOURCE_CHAT_ID;
const TARGET_CHAT_ID = process.env.TARGET_CHAT_ID;

bot.on('text', async (ctx) => {
  if (ctx.chat.id.toString() === SOURCE_CHAT_ID) {
    const text = ctx.message.text || '';
    if (text.includes('важливо') || text.includes('проблема')) {
      await ctx.telegram.sendMessage(TARGET_CHAT_ID, `Звернення оператора:\n\n${text}`);
    }
  }
});

bot.launch().then(() => console.log('Бот запущений!'));
