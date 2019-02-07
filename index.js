const TeleBot = require('telebot');
const store = require('./store');

const BIBIN_ID = 280807529;

const BUTTONS = {
    joke: {
        label: 'Пошутить шутейку',
        command: '/joke'
    },
    support: {
        label: 'Как мне помочь с фразочками?',
        command: '/support'
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
        [BUTTONS.joke.label],
        [BUTTONS.support.label]
    ], {resize: true});


bot.on([BUTTONS.joke.command], msg => {
    if (msg.from.id !== BIBIN_ID) {
        bot.sendMessage(msg.chat.id, store.joke(), {replyMarkup});
    } else {
        bot.sendMessage(msg.chat.id, store.fuckYou(), {replyMarkup});
    }
});

bot.on([BUTTONS.support.command], msg => {
    if (msg.from.id !== BIBIN_ID) {
        bot.sendMessage(msg.chat.id, store.howToSupport(), {replyMarkup});
    } else {
        bot.sendMessage(msg.chat.id, store.fuckYou(), {replyMarkup});
    }
});

bot.on([/.*@PedoBeerBot.*/, '/help', '/start'], msg => {
    if (msg.form.id !== BIBIN_ID) {
        bot.sendMessage(msg.chat.id, store.startMessage(), {replyMarkup})
    } else {
        bot.sendMessage(msg.chat.id, store.fuckYou(), {replyMarkup});
    }
});

bot.start();