import dayjs from "dayjs";
import isYesterday from 'dayjs/plugin/isYesterday';
import isToday from 'dayjs/plugin/isToday';

dayjs.extend(isYesterday);
dayjs.extend(isToday);

export const quickDateFormat = (date: string) => dayjs(new Date(date)).format('YYYY-MM-DD');

export const timePeriod = (date: Date) => {

    if (dayjs(date).isYesterday()) {
        return "Yesterday";
    }
    if (dayjs(date).isToday()) {
        return "Today";
    }

    if (date.getFullYear() !== new Date().getFullYear()) {
        return dayjs(date).format(`MMM-DD-YYYY`)
    }

    return dayjs(date).format(`DD-MMM`)

}

export const safariDateFix = ( weirdDateFormat : string ) => {

    if ( !weirdDateFormat ) return "";

    // weirdDateFormat is identical to 2022-01-21 02:53:47.505+01 

    // and is not parsable in safari as at 2022 - 01

    try {

    const year = Number(weirdDateFormat.substring(0,4));

    const month = Number(weirdDateFormat.substring(5,7)) - 1;

    const day = Number(weirdDateFormat.substring(8,10));

    const hour = Number(weirdDateFormat.substring(11,13));

    const minute = Number(weirdDateFormat.substring(14,16));

    const second = Number(weirdDateFormat.substring(17,19));

    return new Date(year,month,day,hour,minute,second).toISOString();

    } catch {

        return weirdDateFormat;

    }

}

export const dateDifference = (date1 : Date, date2 : Date) => {

    var difference = date1.getTime() - date2.getTime();

    var daysDifference = Math.floor(difference / 1000 / 60 / 60 / 24);
    difference -= daysDifference * 1000 * 60 * 60 * 24

    var hoursDifference = Math.floor(difference / 1000 / 60 / 60);
    difference -= hoursDifference * 1000 * 60 * 60

    var minutesDifference = Math.floor(difference / 1000 / 60);
    difference -= minutesDifference * 1000 * 60

    var secondsDifference = Math.floor(difference / 1000);

    return ({
        day: daysDifference, hour: hoursDifference, minutes: minutesDifference, seconds: secondsDifference
    });

}
