function firstDayWeek(weekNumber, yearStr) {
  const year = Number(yearStr);
  if (weekNumber < 1 || weekNumber > 53) return null;

  // january 1st
  const jan1 = { day: 1, month: 1, year };

  // determine the weekday of Jan 1 (Monday=1 ... Sunday=7)
  // use Zeller's congruence for Gregorian calendar
  let y = year;
  let m = 1;
  let d = 1;
  if (m < 3) {
    m += 12;
    y -= 1;
  }
  const K = y % 100;
  const J = Math.floor(y / 100);
  const f = d + Math.floor((13*(m+1))/5) + K + Math.floor(K/4) + Math.floor(J/4) + 5*J;
  const weekday = ((f % 7) + 6) % 7 + 1; // Monday=1, Sunday=7

  // days to add to reach first Monday
  const offset = weekday === 1 ? 0 : (8 - weekday);

  // day of month for the first day of target week
  const firstDayOfTargetWeek = 1 + offset + (weekNumber - 1) * 7;

  // clamp to Jan 1 if result is before Jan 1
  const day = Math.max(firstDayOfTargetWeek, 1);

  return formatDate(day, 1, year);
}

// helper to format date as dd-mm-yyyy
function formatDate(day, month, year) {
  const dd = String(day).padStart(2, '0');
  const mm = String(month).padStart(2, '0');
  const yyyy = String(year).padStart(4, '0');
  return `${dd}-${mm}-${yyyy}`;
}
