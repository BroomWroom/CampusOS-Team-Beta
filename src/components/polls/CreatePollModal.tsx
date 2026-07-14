import { useState } from "react";
import { Plus, Trash2, X } from "lucide-react";
import { useToast } from "../../context/ToastContext";
import type { Poll } from "../../types/poll";

interface Props {
  open: boolean;
  onClose: () => void;
  onCreate: (poll: Poll) => void;
}

export default function CreatePollModal({
  open,
  onClose,
  onCreate,
}: Props) {
  const { toast } = useToast();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [expiresAt, setExpiresAt] = useState("");

  const [options, setOptions] = useState([
    "",
    "",
  ]);

  if (!open) return null;

  const updateOption = (
    index: number,
    value: string
  ) => {
    const copy = [...options];
    copy[index] = value;
    setOptions(copy);
  };

  const addOption = () => {
    setOptions([...options, ""]);
  };

  const removeOption = (index: number) => {
    if (options.length <= 2) return;

    setOptions(options.filter((_, i) => i !== index));
  };

  const handleCreate = () => {
    if (!title || !description || !expiresAt) {
      toast({
        title: "Missing Information",
        description: "Fill all fields.",
        variant: "warning",
      });
      return;
    }

    const validOptions = options.filter(
      (o) => o.trim() !== ""
    );

    if (validOptions.length < 2) {
      toast({
        title: "Need Options",
        description:
          "Add at least two poll options.",
        variant: "warning",
      });

      return;
    }

    const poll: Poll = {
      id: Date.now().toString(),
      title,
      description,
      createdBy: "Club Lead",
      expiresAt,
      isActive: true,

      options: validOptions.map((text, index) => ({
        id: (index + 1).toString(),
        text,
        votes: 0,
      })),
    };

    onCreate(poll);

    toast({
      title: "Success",
      description: "Poll created successfully.",
      variant: "success",
    });

    setTitle("");
    setDescription("");
    setExpiresAt("");
    setOptions(["", ""]);

    onClose();
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40">

      <div className="w-[700px] rounded-3xl bg-white p-8 shadow-2xl">

        <div className="mb-6 flex items-center justify-between">

          <h1 className="text-3xl font-bold">
            Create Poll
          </h1>

          <button onClick={onClose}>
            <X />
          </button>

        </div>

        <div className="space-y-5">

          <input
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            placeholder="Poll Title"
            className="w-full rounded-xl border p-3"
          />

          <textarea
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
            rows={3}
            placeholder="Description"
            className="w-full rounded-xl border p-3"
          />

          <input
            type="date"
            value={expiresAt}
            onChange={(e) =>
              setExpiresAt(e.target.value)
            }
            className="w-full rounded-xl border p-3"
          />

          <div>

            <h3 className="mb-4 text-lg font-semibold">
              Poll Options
            </h3>

            <div className="space-y-3">

              {options.map((option, index) => (

                <div
                  key={index}
                  className="flex gap-3"
                >

                  <input
                    value={option}
                    onChange={(e) =>
                      updateOption(
                        index,
                        e.target.value
                      )
                    }
                    placeholder={`Option ${
                      index + 1
                    }`}
                    className="flex-1 rounded-xl border p-3"
                  />

                  <button
                    onClick={() =>
                      removeOption(index)
                    }
                    className="rounded-xl bg-red-100 p-3 text-red-600"
                  >
                    <Trash2 size={18} />
                  </button>

                </div>

              ))}

            </div>

            <button
              onClick={addOption}
              className="mt-4 flex items-center gap-2 rounded-xl bg-slate-200 px-4 py-2"
            >
              <Plus size={18} />
              Add Option
            </button>

          </div>

        </div>

        <div className="mt-8 flex justify-end gap-4">

          <button
            onClick={onClose}
            className="rounded-xl border px-6 py-3"
          >
            Cancel
          </button>

          <button
            onClick={handleCreate}
            className="rounded-xl bg-blue-700 px-6 py-3 text-white hover:bg-blue-800"
          >
            Create Poll
          </button>

        </div>

      </div>

    </div>
  );
}