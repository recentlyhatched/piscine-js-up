function firstDayWeek(week, yearStr) {
  const year = parseInt(yearStr, 10);

  // Days in each month (non-leap year by default)
  const monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  // Leap year check
  function isLeap(y) {
    return (y % 4 === 0 && y % 100 !== 0) || (y % 400 === 0);
  }

  // Zeller’s congruence for Gregorian calendar (Monday=1,... Sunday=7)
  function weekday(y, m, d) {
    if (m < 3) {
      m += 12;
      y -= 1;
    }
    let K = y % 100;
    let J = Math.floor(y / 100);
    let h = (d + Math.floor(13 * (m + 1) / 5) + K + Math.floor(K / 4) + Math.floor(J / 4) + 5 * J) % 7;
    // h: 0=Saturday, 1=Sunday, 2=Monday, ...
    let dow = ((h + 5) % 7) + 1; // 1=Monday,...7=Sunday
    return dow;
  }

  // Step 1: Day of week for Jan 1
  const dowJan1 = weekday(year, 1, 1);

  // Step 2: find Monday of week 1
  let day = 1 + ((dowJan1 === 1) ? 0 : (8 - dowJan1));
  let month = 1;

  // Step 3: add (week-1)*7 days
  let daysToAdd = (week - 1) * 7;
  day += daysToAdd;

  // Adjust day/month for overflow
  while (true) {
    let dim = monthDays[month - 1];
    if (month === 2 && isLeap(year)) dim = 29;
    if (day <= dim) break;
    day -= dim;
    month++;
  }

  // Step 4: If the computed date is before Jan 1, fix it
  if (week === 1 && day < 1) {
    day = 1;
    month = 1;
  }

  // Format dd-mm-yyyy
  let dd = String(day).padStart(2, "0");
  let mm = String(month).padStart(2, "0");
  let yyyy = String(year).padStart(4, "0");

  return `${dd}-${mm}-${yyyy}`;
}
