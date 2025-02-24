"use server";

import { auth } from "@clerk/nextjs/server";
import { useUserId } from "@/hooks";
import prisma from "@/lib/prisma";

export const Announcements = async () => {
  const { userId } = await useUserId();
  const { sessionClaims } = await auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role;

  const roleConditions = {
    teacher: { lessons: { some: { teacherId: userId! } } },
    student: { students: { some: { id: userId! } } },
    parent: { students: { some: { parentId: userId! } } },
  };
  const announcements = await prisma.announcement.findMany({
    where: {
      ...(role !== "admin" && {
        OR: [
          { classId: null },
          { class: roleConditions[role as keyof typeof roleConditions] || {} },
        ],
      }),
    },
    take: 3,
    orderBy: {
      date: "desc",
    },
  });

  return (
    <div className="bg-white p-4 rounded-md">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold">Announcements</h1>
        <span className="text-xs text-gray-400">View all</span>
      </div>
      <div className="flex flex-col gap-4 mt-4">
        {announcements[0] && (
          <div className="bg-skyLight rounded-md p-4">
            <div className="flex items-center justify-between">
              <h2 className="font-medium">{announcements[0].title}</h2>
              <span className="text-xs text-gray-400 bg-white rounded-md px-1 py-1">
                {new Intl.DateTimeFormat("en-US").format(announcements[0].date)}
              </span>
            </div>
            <p className="text-sm text-gray-400 mt-1">
              {announcements[0].description}
            </p>
          </div>
        )}
        {announcements[1] && (
          <div className="bg-purpleLight rounded-md p-4">
            <div className="flex items-center justify-between">
              <h2 className="font-medium">{announcements[1].title}</h2>
              <span className="text-xs text-gray-400 bg-white rounded-md px-1 py-1">
                {new Intl.DateTimeFormat("en-US").format(announcements[1].date)}
              </span>
            </div>
            <p className="text-sm text-gray-400 mt-1">
              {announcements[1].description}
            </p>
          </div>
        )}
        {announcements[2] && (
          <div className="bg-yellowLight rounded-md p-4">
            <div className="flex items-center justify-between">
              <h2 className="font-medium">{announcements[2].title}</h2>
              <span className="text-xs text-gray-400 bg-white rounded-md px-1 py-1">
                {new Intl.DateTimeFormat("en-US").format(announcements[2].date)}
              </span>
            </div>
            <p className="text-sm text-gray-400 mt-1">
              {announcements[2].description}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
