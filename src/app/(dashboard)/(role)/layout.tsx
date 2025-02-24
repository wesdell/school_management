import React from "react";
import { Announcements, EventCalendar } from "@/components";

export default function RoleLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col gap-4 p-4 xl:flex-row">
      <div className="w-full xl:w-2/3">
        <div className="h-full bg-white p-4 rounded-md">{children}</div>
      </div>
      <div className="flex flex-col gap-8 w-full xl:w-1/3">
        <EventCalendar />
        <Announcements />
      </div>
    </div>
  );
}
