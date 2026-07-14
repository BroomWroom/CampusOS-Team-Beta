import { useEffect, useState } from "react";
import { useToast } from "../../context/ToastContext";
import { X, CalendarDays, MapPin, Users, User } from "lucide-react";
import type { PlannerEvent } from "../../types/planner";


interface Props {
  event: PlannerEvent | null;
  onClose: () => void;
}

export default function EventModal({
  event,
  onClose,
}: Props) {
  const [registered, setRegistered] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (!event) return;

    const registrations = JSON.parse(
      localStorage.getItem("registeredEvents") || "[]"
    );

    setRegistered(registrations.includes(event.id));
  }, [event]);

  if (!event) return null;

  const handleRegister = () => {
    const registrations = JSON.parse(
      localStorage.getItem("registeredEvents") || "[]"
    );

    if (!registrations.includes(event.id)) {
      registrations.push(event.id);

      localStorage.setItem(
        "registeredEvents",
        JSON.stringify(registrations)
      );

      setRegistered(true);

     toast({
  title: "Registration Successful",
  description: `You have registered for ${event.title}`,
  variant: "success",
});
    }
  };

  const handleGoogleCalendar = () => {
    const start = new Date(event.start)
      .toISOString()
      .replace(/[-:]|\.\d{3}/g, "");

    const end = new Date(event.end)
      .toISOString()
      .replace(/[-:]|\.\d{3}/g, "");

    const url =
      `https://calendar.google.com/calendar/render?action=TEMPLATE` +
      `&text=${encodeURIComponent(event.title)}` +
      `&dates=${start}/${end}` +
      `&details=${encodeURIComponent(event.description)}` +
      `&location=${encodeURIComponent(event.venue)}`;

    window.open(url, "_blank");
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-3xl shadow-xl w-[550px] p-8 relative">

        <button
          onClick={onClose}
          className="absolute top-5 right-5 hover:text-red-500"
        >
          <X />
        </button>

        <span
          className="px-3 py-1 rounded-full text-sm text-white"
          style={{ backgroundColor: event.color }}
        >
          {event.category}
        </span>

        <h1 className="text-3xl font-bold mt-4">
          {event.title}
        </h1>

        <p className="text-slate-500 mt-3">
          {event.description}
        </p>

        <div className="space-y-4 mt-8">

          <div className="flex items-center gap-3">
            <CalendarDays size={20} />
            <span>
              {new Date(event.start).toLocaleString()}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <MapPin size={20} />
            <span>{event.venue}</span>
          </div>

          <div className="flex items-center gap-3">
            <User size={20} />
            <span>{event.organizer}</span>
          </div>

          <div className="flex items-center gap-3">
            <Users size={20} />
            <span>{event.participants} Participants</span>
          </div>

        </div>

        <div className="flex gap-4 mt-10">

          <button
            onClick={handleRegister}
            disabled={registered}
            className={`flex-1 py-3 rounded-xl text-white font-semibold transition ${
              registered
                ? "bg-green-600 cursor-not-allowed"
                : "bg-blue-700 hover:bg-blue-800"
            }`}
          >
            {registered ? "✓ Registered" : "Register"}
          </button>

          <button
            onClick={handleGoogleCalendar}
            className="flex-1 border border-slate-300 hover:bg-slate-100 py-3 rounded-xl font-semibold"
          >
            Add to Google Calendar
          </button>

        </div>

      </div>
    </div>
  );
}