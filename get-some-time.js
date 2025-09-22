function firstDayWeek(week, yearStr) {
    const year = parseInt(yearStr, 10);
    
    // Helper: format dd-mm-yyyy
    function formatDate(d, m, y) {
        return `${String(d).padStart(2, "0")}-${String(m).padStart(2, "0")}-${String(y).padStart(4, "0")}`;
    }
    
    // Manual weekday for Jan 1 (Zeller's congruence, Julian)
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
    
    // Ancient years (<1583)
    if (year < 1583) {
        if (week === 1) {
            // Week 1 starts on January 1st
            return formatDate(1, 1, year);
        }
        
        let dow = weekdayJan1(year);
        // Find first Monday after January 1st
        let firstMonday = 1;
        if (dow === 0) {
            firstMonday = 2; // If Jan 1 is Sunday, first Monday is Jan 2
        } else if (dow > 1) {
            firstMonday = 8 - dow; // If Jan 1 is after Monday, calculate days to next Monday
        }
        
        // Calculate target date
        let targetDay = firstMonday + (week - 2) * 7; // Subtract 1 from week since week 1 is Jan 1
        
        // Handle December dates
        if (targetDay > 31) {
            targetDay -= 31;
            return formatDate(targetDay, 12, year);
        }
        
        return formatDate(targetDay, 1, year);
    }
    
    // Modern years (≥1583)
    let jan1 = new Date(year, 0, 1);
    let dow = jan1.getDay();
    let diff = dow === 0 ? 1 : (1 - dow);
    let mondayOfWeek1 = new Date(year, 0, 1 + diff);
    if (mondayOfWeek1 < jan1) {
        mondayOfWeek1 = new Date(year, 0, 1);
    }
    
    let date = new Date(mondayOfWeek1);
    date.setDate(date.getDate() + (week - 1) * 7);
    return formatDate(date.getDate(), date.getMonth() + 1, date.getFullYear());
}
