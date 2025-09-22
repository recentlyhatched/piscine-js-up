function addWeek(date) {
  const days = [
    "Sunday", "Monday", "Tuesday",
    "Wednesday", "Thursday", "Friday", "Saturday"
  ];

  const dayName = days[date.getUTCDay()];

  const year = date.getUTCFullYear();
  const month = date.getUTCMonth(); // 0-based

  const msPerDay = 24 * 60 * 60 * 1000;
  const msPerWeek = msPerDay * 7;

  // ISO-style: week1 = week containing the 4th
  const anchorUTC = Date.UTC(year, month, 4);
  const anchorDow = new Date(anchorUTC).getUTCDay(); // 0..6
  const daysSinceMondayForAnchor = (anchorDow + 6) % 7; // 0 if Monday
  const week1StartUTC = Date.UTC(year, month, 4 - daysSinceMondayForAnchor);

  // Current week start
  const dateUTC = Date.UTC(year, month, date.getUTCDate());
  const dateDow = date.getUTCDay();
  const daysSinceMondayForDate = (dateDow + 6) % 7;
  const currentWeekStartUTC = Date.UTC(year, month, date.getUTCDate() - daysSinceMondayForDate);

  let diffWeeks = Math.floor((currentWeekStartUTC - week1StartUTC) / msPerWeek);
  let weekOfMonth = diffWeeks + 1;

  // Adjustment: if date falls before week1 start (would be week 0),
  // treat it as week 2
  if (weekOfMonth <= 0) {
    weekOfMonth = 2;
  }

  return weekOfMonth === 2 ? "second" + dayName : dayName;
}


function timeTravel({ date, hour, minute, second }) {
  const newDate = new Date(date.getTime()); // clone
  newDate.setHours(hour, minute, second);
  return newDate;
}
