const { Telegraf } = require('telegraf');

// Беремо токен та ID чатів з налаштувань Render (Environment Variables)
const bot = new Telegraf(process.env.BOT_TOKEN);

const SOURCE_CHAT_ID = process.env.SOURCE_CHAT_ID; // Звідки беремо
const TARGET_CHAT_ID = process.env.TARGET_CHAT_ID; // Куди відправляємо (АКЦ)

bot.on('message', async (ctx) => {
  try {
    // Перевіряємо, чи повідомлення прийшло з потрібної гілки
    if (ctx.chat.id.toString() === SOURCE_CHAT_ID) {
      const text = ctx.message.text || '';
      
      // ЛОГІКА ФІЛЬТРАЦІЇ (можна редагувати)
      // Наприклад: пересилаємо тільки якщо є слово "важливо" або "проблема"
      if (text.includes('важливо') || text.includes('проблема')) {
        await ctx.telegram.sendMessage(TARGET_CHAT_ID, `Переслано з операторів:\n\n${text}`);
      }
    }
  } catch (err) {
    console.error('Помилка:', err);
  }
});

bot.launch().then(() => console.log('Бот запущений!'));
