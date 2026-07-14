import { useEffect, useState } from "react";
import { Plus } from "lucide-react";

import { useAuth } from "../../context/AuthContext";

import type { Poll } from "../../types/poll";

import { mockPolls } from "../../data/mockPolls";

import PollCard from "../../components/polls/PollCard";
import CreatePollModal from "../../components/polls/CreatePollModal";

export default function PollsPage() {
  const { role } = useAuth();

  const canCreate =
    role === "lead" || role === "faculty";

  const [showModal, setShowModal] =
    useState(false);

  const [polls, setPolls] =
    useState<Poll[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem(
      "campus_polls"
    );

    if (saved) {
      setPolls(JSON.parse(saved));
    } else {
      setPolls(mockPolls);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "campus_polls",
      JSON.stringify(polls)
    );
  }, [polls]);

  const handleCreatePoll = (poll: Poll) => {
    setPolls((prev) => [poll, ...prev]);
  };

  const handleVote = (
    pollId: string,
    optionId: string
  ) => {
    setPolls((prev) =>
      prev.map((poll) => {
        if (poll.id !== pollId) return poll;

        return {
          ...poll,

          options: poll.options.map((option) =>
            option.id === optionId
              ? {
                  ...option,
                  votes: option.votes + 1,
                }
              : option
          ),
        };
      })
    );
  };

  return (
    <div className="min-h-screen bg-[#F8F6F2] p-8">

      <div className="mb-10 flex items-center justify-between">

        <div>

          <h1 className="text-4xl font-bold text-slate-800">
            Campus Polls
          </h1>

          <p className="mt-2 text-slate-500">
            Vote on club decisions and upcoming
            activities.
          </p>

        </div>

        {canCreate && (
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 rounded-xl bg-blue-700 px-5 py-3 text-white hover:bg-blue-800"
          >
            <Plus size={18} />

            Create Poll
          </button>
        )}

      </div>

      

      <div className="space-y-8">

             {polls.length === 0 ? (
        <div className="rounded-3xl bg-white p-12 text-center shadow-lg">
          <h2 className="text-2xl font-semibold text-slate-700">
            No Polls Yet
          </h2>

          <p className="mt-3 text-slate-500">
            {canCreate
              ? "Create your first poll to start collecting votes."
              : "There are currently no active polls."}
          </p>
        </div>
      ) : (
        polls.map((poll) => (
          <PollCard
            key={poll.id}
            poll={poll}
            onVote={handleVote}
          />
        ))
      )}
      </div>

      <CreatePollModal
        open={showModal}
        onClose={() => setShowModal(false)}
        onCreate={handleCreatePoll}
      />

    </div>
  );
}