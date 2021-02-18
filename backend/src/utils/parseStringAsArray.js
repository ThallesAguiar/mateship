module.exports = function parseStringAsArray(arrayAsString) {
    return arrayAsString.split(',').map(love => love.trim());
}