export function onlyNumbering(number) {
    return Number(number.replace(/[^0-9]/g, ''));
}