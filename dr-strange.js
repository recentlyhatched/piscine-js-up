function addWeek(date) {
  const days = [
    "Sunday", "Monday", "Tuesday",
    "Wednesday", "Thursday", "Friday", "Saturday"
  ];

  const dayName = days[date.getUTCDay()];
  const dayOfMonth = date.getUTCDate();

  // week groups: 1..7 -> week 1, 8..14 -> week 2, etc.
  const weekOfMonth = Math.ceil(dayOfMonth / 7);

  return weekOfMonth === 2 ? "second" + dayName : dayName;
}



function timeTravel({ date, hour, minute, second }) {
  const newDate = new Date(date.getTime()); // clone
  newDate.setHours(hour, minute, second);
  return newDate;
}
