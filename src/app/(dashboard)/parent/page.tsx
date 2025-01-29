import { Announcements, BigCalendar } from "@/components";

export default function Parent() {
  return (
    <div className="flex-1 flex flex-col gap-4 p-4 xl:flex-row">
      <div className="w-full xl:w-2/3">
        <div className="h-full bg-white p-4 rounded-md">
          <h1 className="text-xl font-semibold">Schedule (Child name)</h1>
          <BigCalendar />
        </div>
      </div>
      <div className="flex flex-col gap-8 w-full xl:w-1/3">
        <Announcements />
      </div>
    </div>
  );
}
