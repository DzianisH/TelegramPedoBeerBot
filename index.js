const TeleBot = require('telebot');

const BUTTONS = {
    joke: {
        label: 'Пошутить шутейку',
        command: '/joke'
    },
    artia: {
        label: 'Послать Артёма',
        command: '/artia'
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
        [BUTTONS.artia.label]
    ], {resize: true});


bot.on(['/joke'], msg => {
    bot.sendMessage(msg.chat.id, "Некогда шутить, сейчас в кино с твоей мамкой", {replyMarkup});
});

bot.on(['/artia'], msg => {
    bot.sendMessage(msg.chat.id, "Артём лох =D", {replyMarkup});
});

bot.on([/.*@PedoBeerBot.*/, '/help', '/start'], msg => {
    bot.sendMessage(msg.chat.id, "Отъебись", {replyMarkup})
});

bot.start();