import { format, parse } from 'date-fns';

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