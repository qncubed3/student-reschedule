import { WeekDetails } from "@/types/enrolment";

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

type MonthMeta = {
  short: string;
  full: string;
};

export const MONTHS: MonthMeta[] = [
  { short: "Jan", full: "January" },
  { short: "Feb", full: "February" },
  { short: "Mar", full: "March" },
  { short: "Apr", full: "April" },
  { short: "May", full: "May" },
  { short: "Jun", full: "June" },
  { short: "Jul", full: "July" },
  { short: "Aug", full: "August" },
  { short: "Sep", full: "September" },
  { short: "Oct", full: "October" },
  { short: "Nov", full: "November" },
  { short: "Dec", full: "December" },
]

function validateWeekRange(start: Date, end: Date) {
    // Validate: start must be before end
    if (start > end) {
        throw new Error("Week start must be before week end");
    }
    
    // Validate: must be exactly 7 days (6 days difference)
    const daysDiff = Math.floor((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    if (daysDiff !== 6) {
        throw new Error(`Week must span exactly 7 days (found ${daysDiff + 1} days)`);
    }
}

export function extractDays(week: WeekDetails | null): number[] | null {
    if (!week) return null;
    const start = new Date(week.week_start);
    const end = new Date(week.week_end);
    
    validateWeekRange(start, end);
    
    // Normalize to midnight to avoid time comparison issues
    start.setHours(0, 0, 0, 0);
    end.setHours(0, 0, 0, 0);
    
    // Extract days without leading zeros
    const days: number[] = [];
    const current = new Date(start);
    while (current.getTime() <= end.getTime()) {
        console.log(current.getDate());
        days.push(current.getDate());
        current.setDate(current.getDate() + 1);
    }
    console.log(days);
    return days;
}

export function extractMonthYear(week: WeekDetails | null): string | null {
    if (!week) return null;
    const start = new Date(week.week_start);
    const end = new Date(week.week_end);
    
    validateWeekRange(start, end);
    
    // Format month/year string
    const startMonth = start.getMonth();
    const endMonth = end.getMonth();
    const startYear = start.getFullYear();
    const endYear = end.getFullYear();
    
    if (startYear === endYear && startMonth === endMonth) {
        // Same month and year: "April 2025"
        return `${MONTHS[startMonth].full} ${startYear}`;
    } else if (startYear === endYear) {
        // Same year, different months: "Apr - May 2025"
        return `${MONTHS[startMonth].short} - ${MONTHS[endMonth].short} ${startYear}`;
    } else {
        // Different years: "Dec 2024 - Jan 2025"
        return `${MONTHS[startMonth].short} ${startYear} - ${MONTHS[endMonth].short} ${endYear}`;
    }
}
