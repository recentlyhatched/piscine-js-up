function firstDayWeek(week, yearStr) {
  const year = parseInt(yearStr, 10);

  function formatDate(d, m, y) {
    return `${String(d).padStart(2, "0")}-${String(m).padStart(2, "0")}-${String(y).padStart(4, "0")}`;
  }

  // ISO week: week 1 is the week containing Jan 4. Weeks start on Monday.
  // work in UTC to avoid timezone shifts.
  const jan4 = new Date(Date.UTC(year, 0, 4));       // jan 4 of the year (UTC)
  const dow = jan4.getUTCDay();                      // 0=Sun,1=Mon,...6=Sat
  const daysToMonday = (dow + 6) % 7;                // how many days to subtract to get Monday
  const mondayOfWeek1 = new Date(Date.UTC(year, 0, 4 - daysToMonday)); // monday of ISO week 1

  // monday of requested week:
  const resultDate = new Date(mondayOfWeek1);
  resultDate.setUTCDate(resultDate.getUTCDate() + (week - 1) * 7);

  return formatDate(resultDate.getUTCDate(), resultDate.getUTCMonth() + 1, resultDate.getUTCFullYear());
}


