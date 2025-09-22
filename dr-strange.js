function addWeek(date) {
  const days = [
    "Sunday", "Monday", "Tuesday",
    "Wednesday", "Thursday", "Friday", "Saturday"
  ];
  const weekday = date.getUTCDay();
  const dayName = days[weekday];
  const dayOfMonth = date.getUTCDate();

  // nth occurrence of this weekday in the month
  const nth = Math.floor((dayOfMonth - 1) / 7) + 1;

  return nth === 2 ? "second" + dayName : dayName;
}



function timeTravel({ date, hour, minute, second }) {
  const newDate = new Date(date.getTime()); // clone
  newDate.setHours(hour, minute, second);
  return newDate;
}
