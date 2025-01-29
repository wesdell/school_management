"use client";

import { useState } from "react";
import { Calendar, momentLocalizer, View, Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { calendarEvents } from "@/mock/data";

const localizer = momentLocalizer(moment);

export const BigCalendar = () => {
  const [view, setView] = useState<View>(Views.WORK_WEEK);

  const handleOnChangeView = (selectedView: View) => setView(selectedView);

  return (
    <Calendar
      localizer={localizer}
      events={calendarEvents}
      startAccessor="start"
      endAccessor="end"
      views={["work_week", "day"]}
      view={view}
      onView={handleOnChangeView}
      min={new Date(2025, 0, 0, 8, 0, 0)}
      max={new Date(2025, 0, 0, 17, 0, 0)}
      style={{ height: "98%" }}
    />
  );
};
