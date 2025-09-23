function firstDayWeek(week, yearStr) {
  const year = parseInt(yearStr, 10);

  function formatDate(d, m, y) {
    return `${String(d).padStart(2, "0")}-${String(m).padStart(2, "0")}-${String(y).padStart(4, "0")}`;
  }

  // Shared ISO logic for "Monday of week 1 = Monday of week containing Jan 4"
  function mondayOfISOWeek1(y, useUTC) {
    const jan4 = useUTC ? new Date(Date.UTC(y, 0, 4)) : new Date(y, 0, 4);
    const dow = useUTC ? jan4.getUTCDay() : jan4.getDay(); // 0=Sun,...6=Sat
    const daysToMonday = (dow + 6) % 7;
    const monday = new Date(jan4);
    if (useUTC) {
      monday.setUTCDate(jan4.getUTCDate() - daysToMonday);
    } else {
      monday.setDate(jan4.getDate() - daysToMonday);
    }
    return monday;
  }

  // ---- Ancient years (Julian calendar approximation) ----
  if (year < 1583) {
    const mondayOfWeek1 = mondayOfISOWeek1(year, true); // use UTC for determinism
    const resultDate = new Date(mondayOfWeek1);
    resultDate.setUTCDate(resultDate.getUTCDate() + (week - 1) * 7);
    return formatDate(resultDate.getUTCDate(), resultDate.getUTCMonth() + 1, resultDate.getUTCFullYear());
  }

  // ---- Modern years (Gregorian calendar) ----
  else {
    const mondayOfWeek1 = mondayOfISOWeek1(year, true); // use UTC again
    const resultDate = new Date(mondayOfWeek1);
    resultDate.setUTCDate(resultDate.getUTCDate() + (week - 1) * 7);
    return formatDate(resultDate.getUTCDate(), resultDate.getUTCMonth() + 1, resultDate.getUTCFullYear());
  }
}

// Test ancient case
console.log(firstDayWeek(52, '1000')); // -> "22-12-1000"

// Test modern case
console.log(firstDayWeek(52, '2023')); // -> "25-12-2023"

