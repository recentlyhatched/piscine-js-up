function firstDayWeek(weekNumber, yearStr) {
  const year = Number(yearStr);
  if (weekNumber < 1 || weekNumber > 53) return null;

  // january 1
  const jan1 = new Date(Date.UTC(year, 0, 1));

  // day of week: Monday=1, Sunday=7
  const jsDay = jan1.getUTCDay(); // 0=Sun..6=Sat
  const jan1Weekday = jsDay === 0 ? 7 : jsDay;

  // days to add to reach first Monday of week 1
  const offset = jan1Weekday === 1 ? 0 : 8 - jan1Weekday;

  // monday of target week
  const targetDay = jan1.getUTCDate() + offset + (weekNumber - 1) * 7;

  const targetDate = new Date(Date.UTC(year, 0, targetDay));

  // clamp to Jan 1 if before Jan 1
  if (targetDate < jan1) return formatDateUTC(jan1);

  return formatDateUTC(targetDate);
}

function formatDateUTC(date) {
  const dd = String(date.getUTCDate()).padStart(2, '0');
  const mm = String(date.getUTCMonth() + 1).padStart(2, '0');
  const yyyy = String(date.getUTCFullYear()).padStart(4, '0');
  return `${dd}-${mm}-${yyyy}`;
}
