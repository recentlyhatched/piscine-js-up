function firstDayWeek(weekNumber, year) {
    // Validate inputs
    if (!Number.isInteger(weekNumber) || weekNumber < 1 || weekNumber > 53) {
        throw new Error('Week must be a number between 1 and 53');
    }
    
    if (!/^\d{4}$/.test(year)) {
        throw new Error('Year must be a valid 4-digit number');
    }

    // Create a date object for January 1st of the given year
    let date = new Date(year, 0, 1);
    
    // Find the first Monday of the year
    if (date.getDay() !== 1) {
        const daysToAdd = date.getDay() === 0 ? 1 : 8 - date.getDay();
        date.setDate(date.getDate() + daysToAdd);
    }
    
    // Calculate the target week
    const weeksToAdd = weekNumber - 1;
    date.setDate(date.getDate() + (weeksToAdd * 7));
    
    // Ensure we haven't crossed into next year
    if (date.getFullYear() > parseInt(year)) {
        return `${String(new Date(year, 0, 1).getDate()).padStart(2, '0')}-${String(new Date(year, 0, 1).getMonth() + 1).padStart(2, '0')}-${year}`;
    }
    
    // Format the result
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    return `${day}-${month}-${year}`;
}


console.log(firstDayWeek(52, '1000'))