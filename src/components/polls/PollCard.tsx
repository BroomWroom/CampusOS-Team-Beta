import { Users, Calendar, CheckCircle } from "lucide-react";
import type { Poll } from "../../types/poll";

interface Props {
  poll: Poll;
  onVote: (pollId: string, optionId: string) => void;
}

export default function PollCard({ poll, onVote }: Props) {
  const totalVotes = poll.options.reduce(
    (sum, option) => sum + option.votes,
    0
  );

  return (
    <div className="rounded-3xl bg-white p-8 shadow-lg">

      {/* Header */}

      <div className="flex items-start justify-between">

        <div>

          <h2 className="text-2xl font-bold text-slate-800">
            {poll.title}
          </h2>

          <p className="mt-2 text-slate-500">
            {poll.description}
          </p>

        </div>

        <span
          className={`rounded-full px-4 py-2 text-sm font-semibold ${
            poll.isActive
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {poll.isActive ? "Active" : "Closed"}
        </span>

      </div>

      {/* Options */}

      <div className="mt-8 space-y-6">

        {poll.options.map((option) => {

          const percent =
            totalVotes === 0
              ? 0
              : Math.round((option.votes / totalVotes) * 100);

          return (

            <div key={option.id}>

              <div className="mb-2 flex justify-between">

                <h3 className="font-medium text-slate-700">
                  {option.text}
                </h3>

                <span className="text-sm text-slate-500">
                  {option.votes} votes • {percent}%
                </span>

              </div>

              <div className="h-3 overflow-hidden rounded-full bg-slate-200">

                <div
                  className="h-full rounded-full bg-blue-700 transition-all duration-700"
                  style={{
                    width: `${percent}%`,
                  }}
                />

              </div>

              <button
                onClick={() =>
                  onVote(poll.id, option.id)
                }
                className="mt-3 flex items-center gap-2 rounded-xl bg-blue-700 px-5 py-2.5 font-medium text-white hover:bg-blue-800"
              >
                <CheckCircle size={18} />
                Vote
              </button>

            </div>

          );
        })}
      </div>

      {/* Footer */}

      <div className="mt-8 flex items-center gap-8 border-t pt-6 text-slate-500">

        <div className="flex items-center gap-2">

          <Users size={18} />

          <span>{totalVotes} Votes</span>

        </div>

        <div className="flex items-center gap-2">

          <Calendar size={18} />

          <span>Ends {poll.expiresAt}</span>

        </div>

      </div>

    </div>
  );
}