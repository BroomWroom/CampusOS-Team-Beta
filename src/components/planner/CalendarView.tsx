import { useState } from "react";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

import EventModal from "./EventModal";

import type { PlannerEvent } from "../../types/planner";

interface CalendarViewProps {
  events: PlannerEvent[];
}

export default function CalendarView({
  events,
}: CalendarViewProps) {
  const [selectedEvent, setSelectedEvent] =
    useState<PlannerEvent | null>(null);

  return (
    <>
      <div className="bg-white rounded-3xl shadow-lg p-5">
        <FullCalendar
          plugins={[
            dayGridPlugin,
            timeGridPlugin,
            interactionPlugin,
          ]}
          initialView="dayGridMonth"
          height={700}
          dayMaxEvents={2}
          eventDisplay="block"
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          eventClassNames={() => [
            "rounded-lg",
            "px-2",
            "py-1",
            "text-xs",
            "font-medium",
          ]}
          events={events}
          eventClick={(info) => {
            const clicked = events.find(
              (event) => event.id === info.event.id
            );

            if (clicked) {
              setSelectedEvent(clicked);
            }
          }}
        />
      </div>

      <EventModal
        event={selectedEvent}
        onClose={() => setSelectedEvent(null)}
      />
    </>
  );
}