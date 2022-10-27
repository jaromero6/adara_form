function dateIsValid(date) {
    // Extraida de https://bobbyhadz.com/blog/javascript-check-if-date-is-valid
    return date instanceof Date && !isNaN(date);
  }




module.exports = {
    dateIsValid
};