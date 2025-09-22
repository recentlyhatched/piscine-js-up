// check if a Date is valid
function isValid(date) {
  return date instanceof Date && !isNaN(date.getTime());
}

// check if date1 is after date2
function isAfter(date1, date2) {
  if (!isValid(date1) || !isValid(date2)) return false;
  return date1.getTime() > date2.getTime();
}

// check if date1 is before date2
function isBefore(date1, date2) {
  if (!isValid(date1) || !isValid(date2)) return false;
  return date1.getTime() < date2.getTime();
}

// check if a date is in the future
function isFuture(date) {
  if (!isValid(date)) return false;
  return date.getTime() > Date.now();
}

// check if a date is in the past
function isPast(date) {
  if (!isValid(date)) return false;
  return date.getTime() < Date.now();
}
