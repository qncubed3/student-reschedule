export function getHourLabels(minTime: number, maxTime: number) {
    return Array.from(
        { length: maxTime - minTime + 1 },
        (_, i) => {
            const hour = minTime + i;
            const isPM = hour >= 12;
            const displayHour = hour % 12 === 0 ? 12 : hour % 12;
            return `${displayHour}:00 ${isPM ? "PM" : "AM"}`;
        }
    );
} 

export function parseTime(timeStr: string): number {
    const [hours, minutes] = timeStr.split(':').map(Number);
    return hours * 60 + minutes;
};

export function formatTimeRange(start: string, end: string): string {
    const parse = (time: string) => {
        // "hh:mm:ss+11" → hh, mm
        const [hh, mm] = time.split(/[+:]/);
        const hour24 = Number(hh);
        const period = hour24 >= 12 ? "pm" : "am";
        const hour12 = hour24 % 12 === 0 ? 12 : hour24 % 12;

        return {
            hour12,
            minute: mm,
            period,
        };
    };

    const s = parse(start);
    const e = parse(end);

    const format = (t: { hour12: number; minute: string }) =>
        t.minute === "00" ? `${t.hour12}` : `${t.hour12}:${t.minute}`;

    const startStr = format(s);
    const endStr = format(e);

    // Same AM/PM → show once
    if (s.period === e.period) {
        return `${startStr} – ${endStr}${s.period}`;
    }

    // Different → show both
    return `${startStr}${s.period} – ${endStr}${e.period}`;
}


export const daysOfWeekMap: Record<string, string> = {
    Monday: "MON",
    Tuesday: "TUE",
    Wednesday: "WED",
    Thursday: "THU",
    Friday: "FRI",
    Saturday: "SAT",
    Sunday: "SUN",
};