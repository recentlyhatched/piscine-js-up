function firstDayWeek(weekNumber, yearStr) {
  const year = Number(yearStr);
  if (weekNumber < 1 || weekNumber > 53) return null;

  // january 1st of the year
  const jan1 = new Date(Date.UTC(year, 0, 1));

  // day of week: 0=Sunday, 1=Monday, ..., 6=Saturday
  const jan1Day = jan1.getUTCDay();
  // Days to move back to Monday (if jan1 is Sunday, move back 6)
  const offset = jan1Day === 0 ? -6 : 1 - jan1Day;

  // date of Monday of week 1
  const week1Monday = new Date(jan1);
  week1Monday.setUTCDate(jan1.getUTCDate() + offset);

  // monday of target week
  const targetMonday = new Date(week1Monday);
  targetMonday.setUTCDate(week1Monday.getUTCDate() + (weekNumber - 1) * 7);

  // if targetMonday is before Jan 1, return Jan 1
  if (targetMonday < jan1) return formatDate(jan1);

  return formatDate(targetMonday);
}

// helper: format as dd-mm-yyyy
function formatDate(date) {
  const dd = String(date.getUTCDate()).padStart(2, '0');
  const mm = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months 0-11
  const yyyy = date.getUTCFullYear();
  return `${dd}-${mm}-${yyyy}`;
}
