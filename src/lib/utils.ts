import { Lesson } from "@prisma/client";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const getFirstMondayDate = () => {
  const today = new Date();
  const todayDay = today.getDay();
  const daysSinceMonday = todayDay === 0 ? 6 : todayDay - 1;
  const firstMondayDate = new Date(today);
  firstMondayDate.setDate(today.getDate() - daysSinceMonday);

  return firstMondayDate;
};

export const updatedStartAndEndDateTime = (data: Lesson[]) => {
  const sc = data.map((item) => {
    const fixedStartDate = new Date(item.startTime);
    const fixedEndDate = new Date(item.endTime);
    const firstMondayDate = getFirstMondayDate();

    const fixedDay = fixedStartDate.getDay(); // 4 (Thursday)
    const daysToAdd = fixedDay === 0 ? 6 : fixedDay - 1; // 3 days (offset from Monday)

    // Apply the offset to the CURRENT week's Monday
    const start = new Date(firstMondayDate);
    const end = new Date(firstMondayDate);
    start.setDate(firstMondayDate.getDate() + daysToAdd);
    end.setDate(firstMondayDate.getDate() + daysToAdd);

    start.setHours(
      fixedStartDate.getHours(),
      fixedStartDate.getMinutes(),
      fixedStartDate.getSeconds(),
      fixedStartDate.getMilliseconds()
    );

    end.setHours(
      fixedEndDate.getHours(),
      fixedEndDate.getMinutes(),
      fixedEndDate.getSeconds(),
      fixedEndDate.getMilliseconds()
    );

    return {
      title: item.name,
      allDay: false,
      start: new Date(
        start.getUTCFullYear(),
        start.getUTCMonth(),
        start.getUTCDate(),
        start.getUTCHours(),
        start.getUTCMinutes()
      ),
      end: new Date(
        end.getUTCFullYear(),
        end.getUTCMonth(),
        end.getUTCDate(),
        end.getUTCHours(),
        end.getUTCMinutes()
      ),
    };
  });

  return sc;
};
