import type { Dayjs } from "dayjs";

export type DateType = {
  startData?: number | Dayjs;
  endData?: string | Dayjs;
  weekEndDay?: number | Dayjs;
  weekStartDay?: number | Dayjs;
  prevMonthDay?: number | Dayjs;
};
