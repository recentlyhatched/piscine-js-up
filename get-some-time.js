function firstDayWeek(weekNumber, year) {
    // Validate inputs
    if (!Number.isInteger(weekNumber) || weekNumber < 1 || weekNumber > 53) {
        throw new Error('Week must be a number between 1 and 53');
    }
    
    if (!/^\d{4}$/.test(year)) {
        throw new Error('Year must be a valid 4-digit number');
    }

    // Create a date object for the first day of the year
    let date = new Date(year, 0, 1);
    
    // Find the first Monday of the year
    if (date.getDay() !== 1) {  // If it's not Monday
        const daysToAdd = date.getDay() === 0 ? 1 : 8 - date.getDay();
        date.setDate(date.getDate() + daysToAdd);
    }
    
    // Calculate the target week
    const weeksToAdd = weekNumber - 1;
    date.setDate(date.getDate() + (weeksToAdd * 7));
    
    // Format the result
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    return `${day}-${month}-${year}`;
}


console.log(firstDayWeek(52, '1000'))