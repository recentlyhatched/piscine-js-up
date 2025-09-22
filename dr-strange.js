function addWeek(date) {
  const names = [
    "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday",
    "secondMonday", "secondTuesday", "secondWednesday", "secondThursday", "secondFriday", "secondSaturday", "secondSunday"
  ];

  // Epoch: 0001-01-01 is Monday
  const epoch = new Date("0001-01-01T00:00:00Z");

  // Difference in days between date and epoch
  const diffDays = Math.floor((date - epoch) / (1000 * 60 * 60 * 24));

  // Ensure positive index (modulo 14)
  const index = ((diffDays % 14) + 14) % 14;

  return names[index];
}

function timeTravel({ date, hour, minute, second }) {
  const d = new Date(date); // copy
  d.setHours(hour);
  d.setMinutes(minute);
  d.setSeconds(second);
  return d;
}

