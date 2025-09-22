function firstDayWeek(weekNumber, yearStr) {
  const year = Number(yearStr);
  if (weekNumber < 1 || weekNumber > 53) return null;

  const monthDays = [31, isLeap(year) ? 29 : 28, 31, 30, 31, 30, 31,
                     31, 30, 31, 30, 31];

  // Day of week for Jan 1 (Monday=1, Sunday=7)
  const jan1 = new Date(Date.UTC(year, 0, 1));
  const weekday = jan1.getUTCDay() === 0 ? 7 : jan1.getUTCDay();

  // Monday of week 1 (clamp to Jan 1 if Monday < Jan 1)
  let firstMonday = 1 - (weekday - 1);
  if (firstMonday < 1) firstMonday = 1;

  // Day of year for target week
  let dayOfYear = firstMonday + (weekNumber - 1) * 7;

  // Convert dayOfYear to month/day
  let month = 0;
  while (month < 12 && dayOfYear > monthDays[month]) {
    dayOfYear -= monthDays[month];
    month++;
  }

  return formatDate(dayOfYear, month + 1, year);
}

function isLeap(year) {
  return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

function formatDate(day, month, year) {
  const dd = String(day).padStart(2, '0');
  const mm = String(month).padStart(2, '0');
  const yyyy = String(year).padStart(4, '0');
  return `${dd}-${mm}-${yyyy}`;
}
