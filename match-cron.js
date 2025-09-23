function matchCron(cron, date) {
    const [min, hour, dayOfMonth, month, dayOfWeek] = cron.split(' ');

    const checks = [
        { field: min, value: date.getMinutes() },
        { field: hour, value: date.getHours() },
        { field: dayOfMonth, value: date.getDate() },
        { field: month, value: date.getMonth() + 1 }, // Months are 0-based in JS
        { field: dayOfWeek, value: date.getDay() },   // Sunday=0
    ];

    return checks.every(check => check.field === '*' || Number(check.field) === check.value);
}