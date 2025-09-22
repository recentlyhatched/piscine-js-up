function addWeek(date) {
  const days = [
    "Sunday", "Monday", "Tuesday", "Wednesday",
    "Thursday", "Friday", "Saturday"
  ];
  
  const dayIndex = date.getDay();
  const dayName = days[dayIndex];

  // find the "week number" starting from 0001-01-01 (Monday)
  const start = new Date('0001-01-01');
  const diffDays = Math.floor((date - start) / (1000 * 60 * 60 * 24));
  const weekNumber = Math.floor(diffDays / 7) + 1;

  if (weekNumber === 1) {
    return dayName;
  } else {
    return "second" + dayName;
  }
}

function timeTravel({ date, hour, minute, second }) {
  const newDate = new Date(date.getTime()); // clone
  newDate.setHours(hour, minute, second);
  return newDate;
}
