const TeleBot = require('telebot');
const store = require('./store');

const BUTTONS = {
    joke: {
        label: 'Пошутить шутейку',
        command: '/joke'
    }
};

const bot = new TeleBot({
    token: process.env.TOKEN,
    usePlugins: ['namedButtons'],
    pluginConfig: {
        namedButtons: {
            buttons: BUTTONS
        }
    }
});

const replyMarkup = bot.keyboard(
    [
        [BUTTONS.joke.label]
    ], {resize: true});


bot.on(['/joke'], msg => {
  //  console.log(msg);
    bot.sendMessage(msg.chat.id, store.getJoke(), {replyMarkup});
});

bot.on([/.*@PedoBeerBot.*/, '/help', '/start'], msg => {
    bot.sendMessage(msg.chat.id, store.getStartMessage(), {replyMarkup})
});

bot.start();