import { format, parse, parseISO } from 'date-fns';

const INPUT_DATE_FORMAT = "yyyy-MM-dd";

export const stringToDate = (dateString: string): Date => {
    return parse(dateString, INPUT_DATE_FORMAT, new Date());
}

export const localDateToString = (date: Date): string => {
    return format(date, INPUT_DATE_FORMAT);
}

export const getToday = () : Date => {
    const withoutTime = localDateToString(new Date());
    return stringToDate(withoutTime);
}

export const getTimeFromDate = (dateString: string) : string => {
    const date = parseISO(dateString);
    return format(date, "HH:mm");
}

export const getMonthAndDayFromDate = (dateString: string): string => {
    const date = parseISO(dateString);
    return format(date, "MMMM, d");
}

export const parseISODuration = (duration: string) : string => {
    const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
    if (!match) return "Invalid duration";
    const hours = match[1] ? parseInt(match[1]) : 0;
    const minutes = match[2] ? parseInt(match[2]) : 0;
    const seconds = match[3] ? parseInt(match[3]) : 0;

    if (hours === 0 && minutes === 0 && seconds === 0) {
        return "0h 0m";
    }

    return `${hours}h ${minutes}m`;

}