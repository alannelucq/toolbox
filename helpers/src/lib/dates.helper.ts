import * as customParseFormat from "dayjs/plugin/customParseFormat";
import * as dayjs from "dayjs";

dayjs.extend(customParseFormat);

export function on(date: string) {
  if (dayjs(date, "DD/MM/YYYY HH:mm").isValid()) {
    return dayjs(date, "DD/MM/YYYY HH:mm").toDate();
  }

  return dayjs(date, "DD/MM/YYYY").startOf("day").toDate();
}

export function isWeekEnd(date: Date) {
  return dayjs(date).day() === 0 || dayjs(date).day() === 6;
}

