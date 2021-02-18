export function onlyNumbering(number = String) {
    return number.replace(/[^0-9]/g, '');
}