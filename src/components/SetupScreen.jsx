function SetupScreen({
  difficulty,
  hideRatings,
  onDifficultyChange,
  onToggleHideRatings,
  onContinue,
}) {
  const difficultyOptions = [
    {
      id: "easy",
      title: "Easy",
      subtitle: "More stars, more control",
      description: "Best for big-name drafts and stronger squads.",
      badge: "Star-heavy",
      icon: "⭐",
      gradient: "from-green-400/25 to-teal-500/10",
    },
    {
      id: "medium",
      title: "Medium",
      subtitle: "Balanced draft challenge",
      description: "A mix of elite players, solid pros and risky picks.",
      badge: "Recommended",
      icon: "⚖️",
      gradient: "from-teal-400/25 to-blue-500/10",
    },
    {
      id: "hard",
      title: "Hard",
      subtitle: "For proper draft chaos",
      description: "Fewer stars, more hidden gems and weaker options.",
      badge: "Challenge",
      icon: "🔥",
      gradient: "from-red-400/25 to-yellow-500/10",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(20,184,166,0.2),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(250,204,21,0.12),_transparent_30%),linear-gradient(135deg,_#020617_0%,_#0f172a_60%,_#042f2e_100%)]" />
      <div className="absolute inset-0 opacity-[0.07] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:46px_46px]" />

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-8 sm:p-6">
        <div className="max-w-7xl w-full">
          <div className="text-center mb-8 sm:mb-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-teal-400/40 bg-teal-500/10 px-4 py-2 mb-5">
              <span className="h-2 w-2 rounded-full bg-teal-400" />
              <p className="text-xs font-black tracking-[3px] text-teal-300 uppercase">
                UnbeatenXI
              </p>
            </div>

            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black mb-4">
              Draft Settings
            </h1>

            <p className="text-slate-300 text-base sm:text-lg">
              Choose how difficult your road to 38-0 should be.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-6">
            {difficultyOptions.map((option) => {
              const active = difficulty === option.id;

              return (
                <button
                  key={option.id}
                  onClick={() => onDifficultyChange(option.id)}
                  className={`group relative overflow-hidden rounded-[2rem] border p-6 text-left transition shadow-2xl ${
                    active
                      ? "border-teal-300 bg-slate-900 shadow-teal-500/20 scale-[1.01]"
                      : "border-slate-800 bg-slate-900/75 hover:border-teal-400 hover:-translate-y-1"
                  }`}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${option.gradient} ${
                      active ? "opacity-100" : "opacity-40 group-hover:opacity-80"
                    } transition`}
                  />

                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-8">
                      <span
                        className={`rounded-full px-4 py-2 text-xs font-black ${
                          active
                            ? "bg-teal-400 text-slate-950"
                            : "bg-slate-950 text-slate-300 border border-slate-700"
                        }`}
                      >
                        {option.badge}
                      </span>

                      <span className="text-4xl">{option.icon}</span>
                    </div>

                    <h2 className="text-4xl font-black mb-2">
                      {option.title}
                    </h2>

                    <p className="font-black text-slate-200 mb-3">
                      {option.subtitle}
                    </p>

                    <p className="text-sm text-slate-400 leading-relaxed">
                      {option.description}
                    </p>

                    <div className="mt-6 h-2 rounded-full bg-slate-950 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          option.id === "easy"
                            ? "w-3/4 bg-green-400"
                            : option.id === "medium"
                            ? "w-1/2 bg-teal-400"
                            : "w-1/3 bg-red-400"
                        }`}
                      />
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-5 mb-8">
            <button
              onClick={onToggleHideRatings}
              className={`relative overflow-hidden rounded-[2rem] border p-6 text-left transition ${
                hideRatings
                  ? "border-yellow-300 bg-yellow-400/10"
                  : "border-slate-800 bg-slate-900/75 hover:border-yellow-400"
              }`}
            >
              <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-yellow-400/10 blur-2xl" />

              <div className="relative z-10">
                <p className="text-sm text-yellow-300 font-black uppercase tracking-[3px] mb-3">
                  Optional Rule
                </p>

                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h3 className="text-3xl font-black mb-2">
                      Hide Ratings
                    </h3>

                    <p className="text-slate-400 text-sm max-w-md">
                      Make each pick more about football knowledge, club links
                      and risk instead of numbers.
                    </p>
                  </div>

                  <p
                    className={`shrink-0 rounded-2xl px-5 py-3 text-lg font-black ${
                      hideRatings
                        ? "bg-yellow-400 text-slate-950"
                        : "bg-slate-950 text-slate-300 border border-slate-700"
                    }`}
                  >
                    {hideRatings ? "ON" : "OFF"}
                  </p>
                </div>
              </div>
            </button>

            <div className="rounded-[2rem] border border-slate-800 bg-slate-900/75 p-6">
              <p className="text-sm text-teal-400 font-black uppercase tracking-[3px] mb-4">
                What changes?
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                <InfoCard title="Easy" text="More elite and top-tier options appear in the draft." />
                <InfoCard title="Medium" text="Balanced mix of stars, good players and risky picks." />
                <InfoCard title="Hard" text="More rotation and weak players. Chemistry matters more." />
              </div>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={onContinue}
              className="group rounded-2xl bg-teal-500 px-12 py-5 text-lg font-black text-white shadow-2xl shadow-teal-500/25 hover:bg-teal-400 hover:-translate-y-1 transition"
            >
              Continue To Formation
              <span className="inline-block ml-2 group-hover:translate-x-1 transition">
                →
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoCard({ title, text }) {
  return (
    <div className="rounded-2xl bg-slate-950 border border-slate-800 p-4">
      <p className="font-black mb-1">{title}</p>
      <p className="text-slate-400">{text}</p>
    </div>
  );
}

export default SetupScreen;