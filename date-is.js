function isValid(date) {
  return date instanceof Date && !isNaN(date.getTime()) ||
         (typeof date === 'number' && !isNaN(new Date(date).getTime()));
}

function toDate(d) {
  if (d instanceof Date) return d;
  if (typeof d === 'number') return new Date(d);
  return null; // reject strings, objects, etc.
}

function isAfter(date1, date2) {
  date1 = toDate(date1);
  date2 = toDate(date2);
  if (!date1 || !date2) return false;
  return date1.getTime() > date2.getTime();
}

function isBefore(date1, date2) {
  date1 = toDate(date1);
  date2 = toDate(date2);
  if (!date1 || !date2) return false;
  return date1.getTime() < date2.getTime();
}

function isFuture(date) {
  date = toDate(date);
  if (!date) return false;
  return date.getTime() > Date.now();
}

function isPast(date) {
  date = toDate(date);
  if (!date) return false;
  return date.getTime() < Date.now();
}
