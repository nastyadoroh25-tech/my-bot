const { Telegraf } = require('telegraf');

// Ініціалізація бота
const bot = new Telegraf(process.env.BOT_TOKEN);

const SOURCE_CHAT_ID = process.env.SOURCE_CHAT_ID;
const TARGET_CHAT_ID = process.env.TARGET_CHAT_ID;

bot.on('text', async (ctx) => {
  // Перевіряємо, чи повідомлення прийшло з потрібного чату
  if (ctx.chat.id.toString() === SOURCE_CHAT_ID) {
    const text = ctx.message.text.toLowerCase(); 

    // Список слів, на які реагує бот
    const triggers = ['повтор', 'номер телефону', 'ен', 'опис', 'важливо', 'проблема'];

    // Перевіряємо, чи є хоча б одне зі слів у повідомленні
    if (triggers.some(trigger => text.includes(trigger))) {
        try {
            // Копіюємо повідомлення
            await ctx.telegram.copyMessage(TARGET_CHAT_ID, ctx.chat.id, ctx.message.message_id);
        } catch (e) {
            console.error("Помилка при пересиланні:", e);
        }
    }
  }
});

bot.launch().then(() => console.log('Бот успішно запущений!'));
