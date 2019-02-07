const json = require('./store');

const getElem= arr => {
    return arr[Math.floor(Math.random() * arr.length)];
};

const getStartMessage = () => {
    return getElem(json.startup);
};

const getJoke = () => {
    return getElem(json.joke);
};

console.log(json);

module.exports.getStartMessage = getStartMessage;
module.exports.getJoke = getJoke;

