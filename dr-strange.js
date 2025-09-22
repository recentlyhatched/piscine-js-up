function addWeek(date) {
  const days = [
    "Sunday", "Monday", "Tuesday",
    "Wednesday", "Thursday", "Friday", "Saturday"
  ];

  // weekday name (use UTC to avoid local TZ surprises)
  const dayName = days[date.getUTCDay()];

  const year = date.getUTCFullYear();
  const month = date.getUTCMonth(); // 0-based

  const msPerDay = 24 * 60 * 60 * 1000;
  const msPerWeek = msPerDay * 7;

  // ISO-style: week 1 is the week containing the 4th of the month.
  // find the Monday that starts week 1:
  const anchorUTC = Date.UTC(year, month, 4); // 4th day of the month UTC
  const anchorDow = new Date(anchorUTC).getUTCDay(); // 0..6 (Sun..Sat)
  const daysSinceMondayForAnchor = (anchorDow + 6) % 7; // 0 if Monday, 1 if Tuesday, ..., 6 if Sunday
  const week1StartUTC = Date.UTC(year, month, 4 - daysSinceMondayForAnchor); // Monday date (may be in previous month)

  // find the Monday that starts the week containing the given date
  const dateUTC = Date.UTC(year, month, date.getUTCDate());
  const dateDow = date.getUTCDay(); // 0..6
  const daysSinceMondayForDate = (dateDow + 6) % 7;
  const currentWeekStartUTC = Date.UTC(year, month, date.getUTCDate() - daysSinceMondayForDate);

  const diffWeeks = Math.floor((currentWeekStartUTC - week1StartUTC) / msPerWeek);
  const weekOfMonth = diffWeeks + 1; // may be <= 0 if date is in a week counted as last week of previous month

  return weekOfMonth === 2 ? "second" + dayName : dayName;
}

function timeTravel({ date, hour, minute, second }) {
  const newDate = new Date(date.getTime()); // clone
  newDate.setHours(hour, minute, second);
  return newDate;
}
