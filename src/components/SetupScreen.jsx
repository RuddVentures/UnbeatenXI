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
    },
    {
      id: "medium",
      title: "Medium",
      subtitle: "Balanced draft challenge",
      description: "A mix of elite players, solid pros and risky picks.",
      badge: "Recommended",
    },
    {
      id: "hard",
      title: "Hard",
      subtitle: "For proper draft chaos",
      description: "Fewer stars, more hidden gems and weaker options.",
      badge: "Challenge",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-teal-950/30" />
      <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-teal-500/20 blur-3xl" />
      <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-yellow-400/10 blur-3xl" />

      <div className="relative z-10 min-h-screen flex items-center justify-center p-6">
        <div className="max-w-6xl w-full">
          <div className="text-center mb-10">
            <p className="text-teal-400 font-black tracking-[5px] mb-4">
              UNBEATEN XI
            </p>

            <h1 className="text-5xl md:text-7xl font-black mb-4">
              Draft Settings
            </h1>

            <p className="text-slate-300 text-lg">
              Choose your route to an unbeaten season.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-8">
            {difficultyOptions.map((option) => {
              const active = difficulty === option.id;

              return (
                <button
                  key={option.id}
                  onClick={() => onDifficultyChange(option.id)}
                  className={`rounded-3xl border p-6 text-left transition shadow-2xl ${
                    active
                      ? "border-teal-400 bg-teal-500 text-white shadow-teal-500/20"
                      : "border-slate-800 bg-slate-900/80 hover:border-teal-400 hover:bg-slate-900"
                  }`}
                >
                  <div className="flex items-center justify-between mb-6">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-black ${
                        active
                          ? "bg-white text-teal-600"
                          : "bg-slate-950 text-teal-400 border border-slate-800"
                      }`}
                    >
                      {option.badge}
                    </span>

                    <span className="text-3xl">
                      {option.id === "easy" && "⭐"}
                      {option.id === "medium" && "⚖️"}
                      {option.id === "hard" && "🔥"}
                    </span>
                  </div>

                  <h2 className="text-3xl font-black mb-2">
                    {option.title}
                  </h2>

                  <p
                    className={`font-bold mb-3 ${
                      active ? "text-white" : "text-slate-300"
                    }`}
                  >
                    {option.subtitle}
                  </p>

                  <p
                    className={`text-sm ${
                      active ? "text-white/80" : "text-slate-400"
                    }`}
                  >
                    {option.description}
                  </p>
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-8">
            <button
              onClick={onToggleHideRatings}
              className={`rounded-3xl border p-6 text-left transition ${
                hideRatings
                  ? "border-yellow-400 bg-yellow-400/10"
                  : "border-slate-800 bg-slate-900/80 hover:border-yellow-400"
              }`}
            >
              <p className="text-sm text-slate-400 font-bold uppercase mb-2">
                Optional Rule
              </p>

              <h3 className="text-2xl font-black mb-2">
                Hide Ratings
              </h3>

              <p className="text-slate-400 text-sm mb-4">
                Make each pick more about football knowledge than numbers.
              </p>

              <p
                className={`inline-flex rounded-full px-4 py-2 text-sm font-black ${
                  hideRatings
                    ? "bg-yellow-400 text-slate-950"
                    : "bg-slate-950 text-slate-300 border border-slate-700"
                }`}
              >
                {hideRatings ? "ON" : "OFF"}
              </p>
            </button>

            <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 lg:col-span-2">
              <p className="text-sm text-teal-400 font-black uppercase mb-2">
                How difficulty works
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                <div className="rounded-2xl bg-slate-950 border border-slate-800 p-4">
                  <p className="font-black mb-1">Easy</p>
                  <p className="text-slate-400">
                    More elite and top-tier players appear.
                  </p>
                </div>

                <div className="rounded-2xl bg-slate-950 border border-slate-800 p-4">
                  <p className="font-black mb-1">Medium</p>
                  <p className="text-slate-400">
                    Balanced mix of stars, good players and risks.
                  </p>
                </div>

                <div className="rounded-2xl bg-slate-950 border border-slate-800 p-4">
                  <p className="font-black mb-1">Hard</p>
                  <p className="text-slate-400">
                    More rotation players and weaker options.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={onContinue}
              className="rounded-2xl bg-teal-500 px-12 py-5 text-lg font-black text-white shadow-2xl shadow-teal-500/20 hover:bg-teal-400 transition"
            >
              Continue To Formation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SetupScreen;