import Image from "next/image";
import { EventCalendar, EventCalendarList } from "@/components";

export const EventCalendarContainer = async ({
  searchParams,
}: {
  searchParams: { [_: string]: string | undefined };
}) => {
  const { date } = await searchParams;

  return (
    <div className="bg-white p-4 rounded-md">
      <EventCalendar />
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold my-4">Events</h1>
        <Image src="/moreDark.png" alt="More dots" width={20} height={20} />
      </div>
      <div className="flex flex-col gap-4">
        <EventCalendarList dateParams={date} />
      </div>
    </div>
  );
};
