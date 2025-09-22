function addWeek(date) {
  const days = [
    "Sunday", "Monday", "Tuesday",
    "Wednesday", "Thursday", "Friday", "Saturday"
  ];

  const dayName = days[date.getUTCDay()];
  const dayOfMonth = date.getUTCDate();

  // week-of-month: days 1-7 -> week 1, 8-14 -> week 2, 15-21 -> week 3, etc.
  const weekOfMonth = Math.floor((dayOfMonth - 1) / 7) + 1;

  return (weekOfMonth === 2) ? "second" + dayName : dayName;
}



function timeTravel({ date, hour, minute, second }) {
  const newDate = new Date(date.getTime()); // clone
  newDate.setHours(hour, minute, second);
  return newDate;
}
