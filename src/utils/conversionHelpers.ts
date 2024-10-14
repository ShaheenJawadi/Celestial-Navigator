 
export function degreesToRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
}


export function dateToJulian(date: Date): number {
    const year = date.getUTCFullYear();
    const month = date.getUTCMonth() + 1; // getUTCMonth() is 0-indexed
    const day = date.getUTCDate();
    const hour = date.getUTCHours();
    const minute = date.getUTCMinutes();
    const second = date.getUTCSeconds();

    // Calculate the Julian Date
    const A = Math.floor((14 - month) / 12);
    const y = year + 4800 - A;
    const m = month + 12 * A - 3;

    const julianDay = day + Math.floor((153 * m + 2) / 5) +
        365 * y + Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) - 32045;

    // Add fractional day
    const fractionalDay = (hour / 24) + (minute / 1440) + (second / 86400);
    
    return julianDay + fractionalDay;
}
