export function capitaliseFirstLetter(str: string): string {
    if (!str) return str; 
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export function formatTime(timeStr: string): string {
    // Remove any timezone if present (+11, +11:00) because JS Date may misinterpret
    const [time] = timeStr.split(/[+-]/); // take only HH:MM:SS part

    const [hourStr, minuteStr] = time.split(":");
    let hour = parseInt(hourStr, 10);
    const minute = minuteStr;

    const ampm = hour >= 12 ? "pm" : "am";
    hour = hour % 12 || 12; // convert 0 → 12

    return `${hour}:${minute}${ampm}`;
}

export function formatDate(input: string): string {
    const date = new Date(input);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // months are 0-indexed
    const year = date.getFullYear().toString().slice(-2); // last 2 digits of year
    return `${day}/${month}/${year}`;
}
