function firstDayWeek(weekNumber, yearStr) {
  const year = Number(yearStr);
  if (weekNumber < 1 || weekNumber > 53) return null;

  // compute the weekday of Jan 1 using Zeller's Congruence
  let y = year;
  let m = 1; // january
  let d = 1; // 1st
  if (m < 3) {
    m += 12;
    y -= 1;
  }
  const K = y % 100;
  const J = Math.floor(y / 100);
  const f = d + Math.floor((13*(m+1))/5) + K + Math.floor(K/4) + Math.floor(J/4) + 5*J;
  const weekday = ((f % 7) + 6) % 7 + 1; // monday=1 ... sunday=7

  // days to add to reach first Monday
  const offset = weekday === 1 ? 0 : 8 - weekday;

  // day of month for the first day of the target week
  const dayOfMonth = Math.max(1, 1 + offset + (weekNumber - 1) * 7);

  return formatDate(dayOfMonth, 1, year);
}

// helper to format as dd-mm-yyyy
function formatDate(day, month, year) {
  const dd = String(day).padStart(2, '0');
  const mm = String(month).padStart(2, '0');
  const yyyy = String(year).padStart(4, '0');
  return `${dd}-${mm}-${yyyy}`;
}

