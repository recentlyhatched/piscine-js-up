function addWeek(date) {
  const days = [
    "Sunday", "Monday", "Tuesday",
    "Wednesday", "Thursday", "Friday", "Saturday"
  ];

  // Use UTC-based day so local timezone/time component doesn't shift the day
  const dayName = days[date.getUTCDay()];

  // start at 0001-01-01 (UTC)
  const startUtc = Date.UTC(1, 0, 1);
  const dateUtc = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());

  const msPerDay = 24 * 60 * 60 * 1000;
  const diffDays = Math.floor((dateUtc - startUtc) / msPerDay);
  const weekNumber = Math.floor(diffDays / 7) + 1;

  // Only the second week gets the "second" prefix
  if (weekNumber === 2) return "second" + dayName;
  return dayName;
}


function timeTravel({ date, hour, minute, second }) {
  const newDate = new Date(date.getTime()); // clone
  newDate.setHours(hour, minute, second);
  return newDate;
}
