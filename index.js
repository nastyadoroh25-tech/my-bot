bot.on('text', async (ctx) => {
  if (ctx.chat.id.toString() === SOURCE_CHAT_ID) {
    const text = ctx.message.text.toLowerCase(); // Робимо текст малим, щоб краще шукати

    // Список слів, на які реагує бот
    const triggers = ['повтор', 'номер телефону', 'ен', 'опис'];

    // Перевіряємо, чи є хоча б одне зі слів у повідомленні
    if (triggers.some(trigger => text.includes(trigger))) {
        // copyMessage автоматично копіює повідомлення (виглядає як цитування/пересилання)
        await ctx.telegram.copyMessage(TARGET_CHAT_ID, ctx.chat.id, ctx.message.message_id);
    }
  }
});
