export function dateIsValid(date) {
    // Extraida de https://bobbyhadz.com/blog/javascript-check-if-date-is-valid
    const now = Date();
    // Se chequea que el nacimiento no sea en una fecha que aun no ocurre
    return date instanceof Date && !isNaN(date);
}

export function dateToStr(date) {
  const mm = '' + (date.getMonth() + 1); // getMonth() is zero-based
  const dd = '' + date.getDate();
  return `${date.getFullYear()}-${mm}-${dd}`;
}
