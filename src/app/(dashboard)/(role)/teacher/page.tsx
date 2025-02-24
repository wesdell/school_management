import React from "react";
import { useUserId } from "@/hooks";
import { BigCalendarContainer } from "@/components";

export default async function Teacher() {
  const { userId } = await useUserId();

  return (
    <>
      <h1 className="text-xl font-semibold">Schedule</h1>
      <BigCalendarContainer type="teacherId" id={userId!} />
    </>
  );
}
