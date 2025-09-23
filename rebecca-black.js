// returns true if the date is a Friday
function isFriday(date) {
    return date.getDay() === 5; // 0=Sunday, 1=Monday, ..., 5=Friday
}

// returns true if the date is a weekend (Saturday or Sunday)
function isWeekend(date) {
    const day = date.getDay();
    return day === 0 || day === 6;
}

// returns true if the year of the date is a leap year
function isLeapYear(date) {
    const year = date.getFullYear();
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

// returns true if the date is the last day of the month
function isLastDayOfMonth(date) {
    const nextDay = new Date(date);
    nextDay.setDate(date.getDate() + 1);
    return nextDay.getDate() === 1;
}