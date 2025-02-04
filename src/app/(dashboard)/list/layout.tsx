"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getTitleFromPath } from "@/utils";
import { role } from "@/mock/data";
import { studentShortcuts, teacherShortcuts } from "@/constants";
import {
  Announcements,
  BigCalendar,
  FormModal,
  Pagination,
  PerformanceChart,
  TableSearch,
} from "@/components";

export default function ListLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const title = getTitleFromPath(pathname);
  const canCreateForm = title.slice(0, -1).toLowerCase() as
    | "teacher"
    | "student"
    | "parent"
    | "subject"
    | "class"
    | "lesson"
    | "exam"
    | "assignment"
    | "result"
    | "attendance"
    | "event"
    | "announcement";

  if (pathname.match(/^\/?list\/[^/]+\/[^/]+$/)) {
    const shortcuts =
      title === "Teachers" ? teacherShortcuts : studentShortcuts;
    return (
      <div className="flex flex-1 flex-col p-4 gap-4 xl:flex-row">
        <div className="w-full xl:w-2/3">
          {children}
          <div className="mt-4 rounded-md p-4 h-[800px] bg-white">
            <h1>Teacher&apos;s schedule</h1>
            <BigCalendar />
          </div>
        </div>
        <div className="flex flex-col gap-4 w-full xl:w-1/3">
          <div className="p-4 rounded-md bg-white">
            <h2 className="text-xl font-semibold">Shortcuts</h2>
            <div className="flex flex-wrap gap-4 mt-4 text-xs text-gray-500">
              {shortcuts.map((shortcut: any) => (
                <Link
                  href={shortcut.href}
                  className={`p-3 rounded-md ${shortcut.bgColor}`}
                >
                  {shortcut.name}
                </Link>
              ))}
            </div>
          </div>
          <PerformanceChart />
          <Announcements />
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-4 bg-white rounded-md m-4 mt-0">
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All {title}</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-yellow">
              <Image src="/filter.png" alt="Filter" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-yellow">
              <Image src="/sort.png" alt="Sort" width={14} height={14} />
            </button>
            {role === "admin" && (
              <FormModal table={canCreateForm} type="create" />
            )}
          </div>
        </div>
      </div>
      {children}
      <Pagination />
    </div>
  );
}
