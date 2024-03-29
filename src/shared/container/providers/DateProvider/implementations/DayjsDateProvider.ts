import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { expiresMailTime, IDateProvider } from "../IDateProvider";

dayjs.extend(utc);
export class DayjsDateProvider implements IDateProvider {
    compareInDays(start_date: Date, end_date: Date): number {
        const end_date_utc = this.convertToUTC(end_date);
        const start_date_utc = this.convertToUTC(start_date);
        return dayjs(end_date_utc).diff(start_date_utc, "day");
    }
    convertToUTC(date: Date): string {
        return dayjs(date).utc().local().format();
    }

    compareInHours(start_date: Date, end_date: Date): number {
        const end_date_utc = this.convertToUTC(end_date);
        const start_date_utc = this.convertToUTC(start_date);
        return dayjs(end_date_utc).diff(start_date_utc, "hour");
    }

    dateNow(): Date {
        return dayjs().toDate();
    }

    addDays(days: number): Date {
        return dayjs().add(days, "days").toDate();
    }

    addHoursExpiration(): Date {
        return dayjs().add(expiresMailTime, "hours").toDate();
    }

    isDateBeforeNow(date: Date): boolean {
        return dayjs().isAfter(dayjs(date));
    }
}
