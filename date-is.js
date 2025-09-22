function isValid(date) {
  if (date instanceof Date) {
    return !isNaN(date.getTime());
  }
  if (typeof date === 'number') {
    // Treat number as timestamp
    return !isNaN(new Date(date).getTime());
  }
  return false;
}

function toDate(d) {
  return d instanceof Date ? d : new Date(d);
}

function isAfter(date1, date2) {
  date1 = toDate(date1);
  date2 = toDate(date2);
  if (!isValid(date1) || !isValid(date2)) return false;
  return date1.getTime() > date2.getTime();
}

function isBefore(date1, date2) {
  date1 = toDate(date1);
  date2 = toDate(date2);
  if (!isValid(date1) || !isValid(date2)) return false;
  return date1.getTime() < date2.getTime();
}

function isFuture(date) {
  date = toDate(date);
  if (!isValid(date)) return false;
  return date.getTime() > Date.now();
}

function isPast(date) {
  date = toDate(date);
  if (!isValid(date)) return false;
  return date.getTime() < Date.now();
}
