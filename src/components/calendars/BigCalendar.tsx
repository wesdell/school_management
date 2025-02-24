"use client";

import { useState } from "react";
import { Calendar, momentLocalizer, View, Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

interface Props {
  schedule: {
    title: string;
    start: Date;
    end: Date;
  }[];
}

export const BigCalendar = ({ schedule }: Props) => {
  const [view, setView] = useState<View>(Views.WORK_WEEK);

  const handleOnChangeView = (selectedView: View) => setView(selectedView);

  return (
    <Calendar
      localizer={localizer}
      events={schedule}
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
