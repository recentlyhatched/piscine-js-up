function firstDayWeek(weekNumber, yearStr) {
  const year = Number(yearStr);
  if (weekNumber < 1 || weekNumber > 53) return null;

  const monthDays = [31, isLeap(year) ? 29 : 28, 31, 30, 31, 30, 31,
                     31, 30, 31, 30, 31];

  const jan1 = new Date(Date.UTC(year, 0, 1));
  const weekday = jan1.getUTCDay() === 0 ? 7 : jan1.getUTCDay(); // Monday=1..Sunday=7

  const daysToMonday = (8 - weekday) % 7;
  const firstMonday = 1 + daysToMonday; // first Monday of week 1

  const dayOfYear = firstMonday + (weekNumber - 1) * 7;

  // Convert dayOfYear → month/day
  let month = 0;
  let day = dayOfYear;
  while (month < 12 && day > monthDays[month]) {
    day -= monthDays[month];
    month++;
  }

  return formatDate(day, month + 1, year);
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
