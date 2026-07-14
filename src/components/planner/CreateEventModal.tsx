import { useState } from "react";
import { X } from "lucide-react";

import { useToast } from "../../context/ToastContext";
import type { PlannerEvent } from "../../types/planner";

interface Props {
  open: boolean;
  onClose: () => void;
  onCreate: (event: PlannerEvent) => void;
}

export default function CreateEventModal({
  open,
  onClose,
  onCreate,
}: Props) {
  const { toast } = useToast();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");

  const [endDate, setEndDate] = useState("");
  const [endTime, setEndTime] = useState("");

  const [venue, setVenue] = useState("");
  const [organizer, setOrganizer] = useState("");

  const [category, setCategory] = useState<
    "Workshop" | "Meeting" | "Competition" | "Hackathon" | "Deadline"
  >("Workshop");

  if (!open) return null;

  const colorMap = {
    Workshop: "#22c55e",
    Meeting: "#f59e0b",
    Competition: "#3b82f6",
    Hackathon: "#8b5cf6",
    Deadline: "#ef4444",
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");

    setStartDate("");
    setStartTime("");

    setEndDate("");
    setEndTime("");

    setVenue("");
    setOrganizer("");

    setCategory("Workshop");
  };

  const handleCreate = () => {
    if (
      !title ||
      !startDate ||
      !startTime ||
      !venue ||
      !organizer
    ) {
      toast({
        title: "Missing Fields",
        description: "Please fill all required fields.",
        variant: "warning",
      });

      return;
    }

    const finalEndDate = endDate || startDate;
    const finalEndTime = endTime || startTime;

    const event: PlannerEvent = {
      id: Date.now().toString(),

      title,

      description,

      category,

      start: `${startDate}T${startTime}:00`,

      end: `${finalEndDate}T${finalEndTime}:00`,

      venue,

      organizer,

      participants: 0,

      color: colorMap[category],
    };

    onCreate(event);

    toast({
      title: "Event Created",
      description: `${title} has been added successfully.`,
      variant: "success",
    });

    resetForm();

    onClose();
  };

  return (
  <div className="fixed inset-0 z-[9999] flex items-center justify-center overflow-y-auto bg-black/50 p-6 backdrop-blur-sm">
    <div className="relative max-h-[90vh] w-[700px] overflow-y-auto rounded-3xl bg-white p-8 shadow-2xl">
      <button
        onClick={() => {
          resetForm();
          onClose();
        }}
        className="absolute right-6 top-6 rounded-lg p-2 hover:bg-slate-100"
      >
        <X />
      </button>

      <h1 className="text-3xl font-bold text-slate-800">
        Create New Event
      </h1>

      <p className="mt-2 text-slate-500">
        Add a new event to the Campus Planner
      </p>

     <div className="mt-8 max-h-[60vh] space-y-5 overflow-y-auto pr-2">

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Event Title"
          className="w-full rounded-xl border border-slate-300 p-3 outline-none focus:border-blue-600"
        />

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          placeholder="Description"
          className="w-full rounded-xl border border-slate-300 p-3 outline-none focus:border-blue-600 resize-none"
        />

        <div className="grid grid-cols-2 gap-4">

          <div>
            <label className="mb-2 block text-sm font-semibold">
              Start Date
            </label>

            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full rounded-xl border border-slate-300 p-3"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold">
              Start Time
            </label>

            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="w-full rounded-xl border border-slate-300 p-3"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold">
              End Date
            </label>

            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full rounded-xl border border-slate-300 p-3"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold">
              End Time
            </label>

            <input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="w-full rounded-xl border border-slate-300 p-3"
            />
          </div>

        </div>

        <input
          value={venue}
          onChange={(e) => setVenue(e.target.value)}
          placeholder="Venue"
          className="w-full rounded-xl border border-slate-300 p-3 outline-none focus:border-blue-600"
        />

        <input
          value={organizer}
          onChange={(e) => setOrganizer(e.target.value)}
          placeholder="Organizer"
          className="w-full rounded-xl border border-slate-300 p-3 outline-none focus:border-blue-600"
        />

        <select
          value={category}
          onChange={(e) =>
            setCategory(
              e.target.value as
                | "Workshop"
                | "Meeting"
                | "Competition"
                | "Hackathon"
                | "Deadline"
            )
          }
          className="w-full rounded-xl border border-slate-300 p-3"
        >
          <option value="Workshop">Workshop</option>
          <option value="Meeting">Meeting</option>
          <option value="Competition">Competition</option>
          <option value="Hackathon">Hackathon</option>
          <option value="Deadline">Deadline</option>
        </select>

      </div>

      <div className="mt-8 flex justify-end gap-4">

        <button
          onClick={() => {
            resetForm();
            onClose();
          }}
          className="rounded-xl border border-slate-300 px-6 py-3 font-medium hover:bg-slate-100"
        >
          Cancel
        </button>

        <button
          onClick={handleCreate}
          className="rounded-xl bg-blue-700 px-6 py-3 font-semibold text-white hover:bg-blue-800"
        >
          Create Event
        </button>

      </div>

    </div>
  </div>
);
}