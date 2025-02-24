import prisma from "@/lib/prisma";
import { BigCalendar } from "@/components";
import { adjustScheduleToCurrentWorkWeek } from "@/utils";

interface Props {
  type: "teacherId" | "classId";
  id: string | number;
}

export const BigCalendarContainer = async ({ type, id }: Props) => {
  const data = await prisma.lesson.findMany({
    where: {
      ...(type === "teacherId"
        ? { teacherId: id as string }
        : { classId: id as number }),
    },
  });

  const calendarEvents = data.map((lesson) => ({
    title: lesson.name,
    start: lesson.startTime,
    end: lesson.endTime,
  }));
  const schedule = adjustScheduleToCurrentWorkWeek(calendarEvents);

  return <BigCalendar schedule={schedule} />;
};
