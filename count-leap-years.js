function countLeapYears(date) {
    const year = date.getFullYear();
    // count leap years using the rules:
    // divisible by 4, but not 100 unless divisible by 400
    const leapYears = Math.floor(year / 4) - Math.floor(year / 100) + Math.floor(year / 400);
    return leapYears;
}