function firstDayWeek(week, yearStr) {
  const year = parseInt(yearStr, 10);

  // Helper: format dd-mm-yyyy
  function formatDate(d, m, y) {
    return `${String(d).padStart(2, "0")}-${String(m).padStart(2, "0")}-${String(y).padStart(4, "0")}`;
  }

  // Manual weekday for Jan 1 (Zeller’s congruence, Gregorian)
  function weekdayJan1(y) {
    let d = 1, m = 1;
    if (m < 3) {
      m += 12;
      y -= 1;
    }
    let K = y % 100;
    let J = Math.floor(y / 100);
    let h = (d + Math.floor((13 * (m + 1)) / 5) + K + Math.floor(K / 4) + Math.floor(J / 4) + (5 * J)) % 7;
    // h=0 Saturday, 1=Sunday, 2=Monday...6=Friday
    let dow = (h + 6) % 7; // Convert → 0=Sunday,1=Monday,...6=Saturday
    return dow;
  }

  // ---------------- Ancient years ----------------
  if (year < 1000) {
    let dow = weekdayJan1(year); // 0=Sunday,1=Monday,...
    let shift = dow === 0 ? 1 : (1 - dow); 
    let day = 1 + shift;
    if (day < 1) day = 1; // clamp to Jan 1
    day += (week - 1) * 7;
    let month = 1;

    const isLeap = (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
    const daysInMonth = [31, isLeap ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    for (let i = 0; i < 12; i++) {
      if (day > daysInMonth[i]) {
        day -= daysInMonth[i];
        month++;
      } else {
        break;
      }
    }
    return formatDate(day, month, year);
  }

  // ---------------- Modern years ----------------
  let jan1 = new Date(year, 0, 1);
  let dow = jan1.getDay(); // 0=Sunday,1=Monday,...
  let diff = (dow === 0 ? 1 : (1 - dow));
  let mondayOfWeek1 = new Date(year, 0, 1 + diff);

  if (mondayOfWeek1 < jan1) {
    mondayOfWeek1 = new Date(year, 0, 1); // clamp
  }

  let date = new Date(mondayOfWeek1);
  date.setDate(date.getDate() + (week - 1) * 7);

  return formatDate(date.getDate(), date.getMonth() + 1, date.getFullYear());
}

// ✅ Tests
console.log(firstDayWeek(1, "2023"));  // 02-01-2023
console.log(firstDayWeek(10, "2023")); // 06-03-2023
console.log(firstDayWeek(1, "2021"));  // 01-01-2021
console.log(firstDayWeek(2, "0001"));  // 08-01-0001

