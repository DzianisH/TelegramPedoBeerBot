const json = require('./store');

const getElem= arr => {
    return arr[Math.floor(Math.random() * arr.length)];
};

module.exports.startMessage = () => {
    return getElem(json.startup);
};

module.exports.joke = () => {
    return getElem(json.joke);
};

module.exports.howToSupport = () => {
    return getElem(json.github);
};

module.exports.fuckYou = () => {
    return getElem(json.fuckYou);
};

module.exports.silence = () => {
    return getElem(json.silence);
};

module.exports.forceShutUp = alreadyShutedUp => {
    return getElem(alreadyShutedUp ? json.iAlreadyShutUp : json.iWillShutUp);
};
