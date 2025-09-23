function dayOfTheYear(date) {
    const startOfYear = new Date(date.getFullYear(), 0, 1); // jan 1 of that year
    const diff = date - startOfYear; // difference in milliseconds
    const oneDay = 1000 * 60 * 60 * 24; // milliseconds in a day
    return Math.floor(diff / oneDay) + 1; // +1 because Jan 1 is day 1
}