import {
  Announcements,
  AttendanceChartContainer,
  CountChartContainer,
  EventCalendarContainer,
  FinanceChart,
  UserCard,
} from "@/components";

export default function Admin({
  searchParams,
}: {
  searchParams: { [_: string]: string | undefined };
}) {
  return (
    <div className="flex flex-col gap-4 p-4 md:flex-row">
      <div className="flex flex-col gap-8 w-full lg:w-2/3">
        <div className="flex justify-between flex-wrap gap-4">
          <UserCard type="admin" />
          <UserCard type="student" />
          <UserCard type="teacher" />
          <UserCard type="parent" />
        </div>
        <div className="flex gap-4 flex-col lg:flex-row">
          <div className="w-full lg:w-1/3 h-[450px]">
            <CountChartContainer />
          </div>
          <div className="w-full lg:w-2/3 h-[450px]">
            <AttendanceChartContainer />
          </div>
        </div>
        <div className="w-full h-[500px]">
          <FinanceChart />
        </div>
      </div>
      <div className="flex flex-col gap-8 w-full lg:w-1/3">
        <EventCalendarContainer searchParams={searchParams} />
        <Announcements />
      </div>
    </div>
  );
}
