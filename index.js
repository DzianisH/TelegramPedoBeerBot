const TeleBot = require('telebot');
const store = require('./store');

const BIBIN_ID = 280807529;
const SILENCE_TIMEOUT = 45 * 60 * 1000;

const BUTTONS = {
    joke: {
        label: 'Хочу шутейку',
        command: '/joke'
    },
    support: {
        label: 'Как добавить фразочки?',
        command: '/support'
    },
    shutUp: {
        label: "Завали",
        command: "/shutUp"
    }
};

const bot = new TeleBot({
    token: getAPIToken(),
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
        [BUTTONS.support.label, BUTTONS.shutUp.label]
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
    if (msg.from.id !== BIBIN_ID) {
        bot.sendMessage(msg.chat.id, store.startMessage(), {replyMarkup})
    } else {
        bot.sendMessage(msg.chat.id, store.fuckYou(), {replyMarkup});
    }
});

const onSilence = {};
bot.on(['text'], msg => {
    const chatId = msg.chat.id;
    clearSilence(chatId);
    if (!msg.skipSilenceTimeout) {
        onSilence[chatId] = setInterval(() => bot.sendMessage(chatId, store.silence(), {replyMarkup}), SILENCE_TIMEOUT);
    }
});

bot.on([BUTTONS.shutUp.command], msg => {
    msg.skipSilenceTimeout = true;
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, store.forceShutUp(!onSilence[chatId]));
});

bot.start();


function clearSilence(chatId) {
    const element = onSilence[chatId];
    if (element) {
        clearTimeout(element);
        onSilence[chatId] = undefined;
    }
}

function getAPIToken() {
    if (process.argv.length < 3 || !process.argv[2] || process.argv[2].trim() === ''){
        console.error("You must provide Telegram token. Ex: `node index.js YOUR_TOKEN`");
        throw new Error("Please, provide token");
    }
    return process.argv[2];
}
