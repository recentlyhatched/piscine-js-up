function firstDayWeek(week, year) {
  // Start with January 1st of the given year
  let date = new Date(year, 0, 1);

  // Find Monday of the week that contains Jan 1st
  let day = date.getDay(); // Sunday=0, Monday=1, ...
  let diff = (day === 0 ? -6 : 1 - day); // shift to Monday
  date.setDate(date.getDate() + diff);

  // Add (week - 1) * 7 days to get to the requested week
  date.setDate(date.getDate() + (week - 1) * 7);

  // If calculated date is before Jan 1st of given year → return Jan 1st
  let startOfYear = new Date(year, 0, 1);
  if (date < startOfYear) {
    date = startOfYear;
  }

  // Format as dd-mm-yyyy
  let dd = String(date.getDate()).padStart(2, "0");
  let mm = String(date.getMonth() + 1).padStart(2, "0");
  let yyyy = date.getFullYear();

  return `${dd}-${mm}-${yyyy}`;
}
