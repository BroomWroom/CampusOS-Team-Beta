import {
  CalendarDays,
  Users,
  ClipboardList,
  Clock,
} from "lucide-react";

import type { PlannerEvent } from "../../types/planner";

interface Props {
  events: PlannerEvent[];
}

export default function StatsCards({ events }: Props) {
  const totalParticipants = events.reduce(
    (sum, event) => sum + event.participants,
    0
  );

  const meetings = events.filter(
    (event) => event.category === "Meeting"
  ).length;

  const deadlines = events.filter(
    (event) => event.category === "Deadline"
  ).length;

  const stats = [
    {
      title: "Events",
      value: events.length,
      icon: CalendarDays,
      color: "bg-blue-100 text-blue-700",
    },
    {
      title: "Participants",
      value: totalParticipants,
      icon: Users,
      color: "bg-green-100 text-green-700",
    },
    {
      title: "Meetings",
      value: meetings,
      icon: ClipboardList,
      color: "bg-yellow-100 text-yellow-700",
    },
    {
      title: "Deadlines",
      value: deadlines,
      icon: Clock,
      color: "bg-red-100 text-red-700",
    },
  ];

  return (
    <div className="grid grid-cols-4 gap-6 mb-8">
      {stats.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition-all"
          >
            <div
              className={`w-14 h-14 rounded-xl flex items-center justify-center ${item.color}`}
            >
              <Icon size={28} />
            </div>

            <h2 className="text-3xl font-bold mt-5">
              {item.value}
            </h2>

            <p className="text-slate-500 mt-1">
              {item.title}
            </p>
          </div>
        );
      })}
    </div>
  );
}