import dayjs from "dayjs";
import { recurringFrequencyType, reminderFrequencyType } from "types/billTypes";

export const recurringFrequencies: recurringFrequencyType[] = [
    { label: "Daily", value: "daily" },
    { label: "Weekly", value: "weekly" },
    { label: "Monthly", value: "monthly" },
    { label: "One Off", value: "one-off" }
];

export const nextRecurringDate = (date?: recurringFrequencyType): string => {

    if (!date) return dayjs().add(1, "month").format("MMM DD, YYYY");

    switch (date.value) {

        case "daily":
            return dayjs().add(1, 'day').format("MMM DD, YYYY");

        case "weekly":
            return dayjs().add(1, "week").format("MMM DD, YYYY");

        default:
            return dayjs().add(1, "month").format("MMM DD, YYYY");

    }

}

export const reminderFrequencies: reminderFrequencyType[] = [
    { label: "1 day before", value: "1-day" },
    { label: "2 days before", value: "2-day" },
    { label: "3 days before", value: "3-day" },
    { label: "1 week before", value: "1-week" }
];
