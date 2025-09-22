function firstDayWeek(weekNumber, yearStr) {
  const year = Number(yearStr);
  if (weekNumber < 1 || weekNumber > 53) return null;

  // Week 1 starts on Jan 1
  const firstDayOfWeek1 = 1; // day of month

  // Day of month for target week
  const dayOfMonth = firstDayOfWeek1 + (weekNumber - 1) * 7;

  // Clamp to 1 if somehow negative (not needed here)
  const day = Math.max(dayOfMonth, 1);

  return formatDate(day, 1, year);
}

// Helper: dd-mm-yyyy
function formatDate(day, month, year) {
  const dd = String(day).padStart(2, '0');
  const mm = String(month).padStart(2, '0');
  const yyyy = String(year).padStart(4, '0');
  return `${dd}-${mm}-${yyyy}`;
}
