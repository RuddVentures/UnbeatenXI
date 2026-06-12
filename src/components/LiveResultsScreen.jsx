function LiveResultsScreen({ fixture, onSkipToFinalTable }) {
  if (!fixture) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-4">
        <p className="text-lg font-bold">Loading fixture...</p>
      </div>
    );
  }

  const resultConfig = {
    win: {
      label: "WIN",
      emoji: "🟢",
      text: "text-green-400",
      border: "border-green-500",
      bg: "bg-green-950/30",
    },
    draw: {
      label: "DRAW",
      emoji: "🟡",
      text: "text-amber-400",
      border: "border-amber-400",
      bg: "bg-amber-950/30",
    },
    loss: {
      label: "LOSS",
      emoji: "🔴",
      text: "text-red-400",
      border: "border-red-500",
      bg: "bg-red-950/30",
    },
  };

  const config = resultConfig[fixture.result] || resultConfig.draw;
  const progressPercent = Math.round((fixture.matchNumber / 38) * 100);
  const opponentDisplay =
    fixture.homeAway === "Home"
      ? `${fixture.opponent} (H)`
      : `${fixture.opponent} (A)`;

  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-4">
      <div className="max-w-4xl w-full rounded-3xl border border-slate-800 bg-slate-900 p-5 shadow-2xl shadow-black/40">
        <div className="text-center mb-4">
          <p className="text-teal-400 font-bold tracking-[4px] mb-1 text-sm">
            ULTIMATE 38
          </p>
          <h1 className="text-3xl md:text-4xl font-black">
            Season Simulation
          </h1>
        </div>

        <div className="mb-4 rounded-2xl border border-slate-800 bg-slate-950 p-3">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="font-bold text-slate-300">Season Progress</span>
            <span className="font-black text-teal-400">
              {fixture.matchNumber}/38
            </span>
          </div>

          <div className="h-2.5 w-full rounded-full bg-slate-800 overflow-hidden">
            <div
              className="h-full rounded-full bg-teal-500 transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div
            className={`rounded-3xl border ${config.border} ${config.bg} p-5 text-center`}
          >
            <p className="text-xs uppercase tracking-[3px] text-slate-400 font-bold mb-2">
              Matchday {fixture.matchNumber}
            </p>

            <p className="text-2xl font-black mb-1">Your Ultimate XI</p>

            <p className="text-sm text-slate-400 mb-4">
              vs {opponentDisplay}
            </p>

            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="rounded-2xl bg-slate-950 border border-slate-800 px-5 py-3">
                <p className="text-xs text-slate-500 font-bold mb-1">YOU</p>
                <p className="text-4xl font-black">{fixture.userGoals}</p>
              </div>

              <p className="text-3xl font-black text-slate-500">-</p>

              <div className="rounded-2xl bg-slate-950 border border-slate-800 px-5 py-3">
                <p className="text-xs text-slate-500 font-bold mb-1">OPP</p>
                <p className="text-4xl font-black">{fixture.opponentGoals}</p>
              </div>
            </div>

            <div
              className={`inline-flex items-center gap-2 rounded-full border ${config.border} bg-slate-950 px-5 py-2`}
            >
              <span>{config.emoji}</span>
              <span className={`font-black ${config.text}`}>
                {config.label}
              </span>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-950 p-5">
            <h2 className="text-xl font-black mb-3">Goals</h2>

            {fixture.goalEvents.length === 0 ? (
              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4 text-center">
                <p className="text-slate-400">No goals scored.</p>
              </div>
            ) : (
              <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
                {fixture.goalEvents.map((goal, index) => (
                  <div
                    key={`${goal.scorer}-${index}`}
                    className="rounded-2xl border border-slate-800 bg-slate-900 p-3"
                  >
                    <p className="font-black text-sm">⚽ {goal.scorer}</p>

                    {goal.assist && (
                      <p className="text-xs text-slate-400 mt-1">
                        🎯 Assist: {goal.assist}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <button
          onClick={onSkipToFinalTable}
          className="mt-4 w-full rounded-xl border border-slate-700 px-6 py-3 font-bold text-slate-300 hover:border-teal-400 hover:text-white hover:bg-slate-800"
        >
          Skip To Final Table
        </button>
      </div>
    </div>
  );
}

export default LiveResultsScreen;