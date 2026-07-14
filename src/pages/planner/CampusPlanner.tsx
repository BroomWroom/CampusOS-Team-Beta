import { useEffect, useState } from "react";

import PlannerHeader from "../../components/planner/PlannerHeader";
import CalendarView from "../../components/planner/CalendarView";
import StatsCards from "../../components/planner/StatsCards";
import CreateEventModal from "../../components/planner/CreateEventModal";
import { useAuth } from "../../context/AuthContext";


import { mockEvents } from "../../data/mockEvents";
import type { PlannerEvent } from "../../types/planner";

export default function CampusPlanner() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const { role } = useAuth();

const canCreate =
  role === "lead" || role === "faculty";

  const [events, setEvents] = useState<PlannerEvent[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("campusEvents");

    if (saved) {
      setEvents(JSON.parse(saved));
    } else {
      setEvents(mockEvents);
      localStorage.setItem(
        "campusEvents",
        JSON.stringify(mockEvents)
      );
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#F8F6F2] p-8">

      <PlannerHeader
  showCreate={canCreate}
  onCreate={() => setShowCreateModal(true)}
/>
      <StatsCards events={events} />

      <div className="grid grid-cols-12 gap-8 mt-8">

        {/* Calendar */}
        <div className="col-span-9">
          <CalendarView events={events} />
        </div>

        {/* Sidebar */}
        <div className="col-span-3">
          <div className="bg-white rounded-3xl shadow-lg p-6">

            <h2 className="text-xl font-semibold text-slate-800 mb-6">
              Upcoming Events
            </h2>

            <div className="space-y-5">

              {events.slice(0, 6).map((event) => (
                <div
                  key={event.id}
                  className="pl-4 border-l-4"
                  style={{ borderColor: event.color }}
                >
                  <h3 className="font-semibold text-slate-800">
                    {event.title}
                  </h3>

                  <p className="text-sm text-slate-500">
                    {new Date(event.start).toLocaleString()}
                  </p>

                  <p className="text-xs text-slate-400">
                    {event.venue}
                  </p>
                </div>
              ))}

            </div>

          </div>
        </div>

      </div>

      <CreateEventModal
  open={showCreateModal}
  onClose={() => setShowCreateModal(false)}
  onCreate={(newEvent) => {
    const updated = [...events, newEvent];

    setEvents(updated);

    localStorage.setItem(
      "campusEvents",
      JSON.stringify(updated)
    );
  }}
/>

    </div>
  );
}
