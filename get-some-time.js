function firstDayWeek(weekNumber, yearStr) {
  const year = Number(yearStr);
  if (weekNumber < 1 || weekNumber > 53) return null;

  const monthDays = [31, isLeap(year) ? 29 : 28, 31, 30, 31, 30, 31,
                     31, 30, 31, 30, 31];

  // Start from Jan 1
  let dayOfYear = 1 + (weekNumber - 1) * 7;

  // Determine month and day
  let month = 0;
  while (month < 12 && dayOfYear > monthDays[month]) {
    dayOfYear -= monthDays[month];
    month++;
  }

  return formatDate(dayOfYear, month + 1, year);
}

// Check leap year
function isLeap(year) {
  return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

// Format dd-mm-yyyy
function formatDate(day, month, year) {
  const dd = String(day).padStart(2, '0');
  const mm = String(month).padStart(2, '0');
  const yyyy = String(year).padStart(4, '0');
  return `${dd}-${mm}-${yyyy}`;
}
