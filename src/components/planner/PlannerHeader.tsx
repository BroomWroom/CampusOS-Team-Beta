import { CalendarDays, Plus } from "lucide-react";

interface PlannerHeaderProps {
  showCreate?: boolean;
  onCreate?: () => void;
}

export default function PlannerHeader({
  showCreate = true,
  onCreate,
}: PlannerHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <div className="flex items-center gap-3">
          <CalendarDays className="w-8 h-8 text-blue-700" />

          <h1 className="text-3xl font-bold text-slate-900">
            Campus Planner
          </h1>
        </div>

        <p className="mt-2 text-slate-500">
          Manage events, meetings and deadlines across CampusOS.
        </p>
      </div>

      {showCreate && (
        <button
          onClick={() => {
  console.log("BUTTON CLICKED");
  onCreate?.();
}}
          className="flex items-center gap-2 rounded-xl bg-blue-700 px-5 py-3 font-medium text-white transition hover:bg-blue-800"
        >
          <Plus size={18} />
          Create Event
        </button>
      )}
    </div>
  );
}