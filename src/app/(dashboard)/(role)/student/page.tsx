import React from "react";
import prisma from "@/lib/prisma";
import { useUserId } from "@/hooks";
import { BigCalendarContainer } from "@/components";

export default async function Student() {
  const { userId } = await useUserId();
  const classItem = await prisma.class.findMany({
    where: { students: { some: { id: userId! } } },
  });

  return (
    <>
      <h1 className="text-xl font-semibold">Schedule (A4)</h1>
      <BigCalendarContainer type="classId" id={classItem[0].id} />
    </>
  );
}
