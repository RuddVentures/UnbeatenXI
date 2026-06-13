function LiveResultsScreen({ fixture, onSkipToFinalTable }) {
  if (!fixture) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-4">
        <p className="text-lg font-black">Loading fixture...</p>
      </div>
    );
  }

  const resultConfig = {
    win: {
      label: "WIN",
      subtitle: "Three points secured",
      text: "text-green-300",
      border: "border-green-400",
      bg: "bg-green-400/10",
      badge: "bg-green-400 text-slate-950",
      progress: "bg-green-400",
    },
    draw: {
      label: "DRAW",
      subtitle: "Points shared",
      text: "text-yellow-300",
      border: "border-yellow-400",
      bg: "bg-yellow-400/10",
      badge: "bg-yellow-400 text-slate-950",
      progress: "bg-yellow-400",
    },
    loss: {
      label: "LOSS",
      subtitle: "Defeat on the day",
      text: "text-red-300",
      border: "border-red-400",
      bg: "bg-red-400/10",
      badge: "bg-red-400 text-white",
      progress: "bg-red-400",
    },
  };

  const config = resultConfig[fixture.result] || resultConfig.draw;
  const progressPercent = Math.round((fixture.matchNumber / 38) * 100);
  const liveTable = fixture.liveTable || [];
  const topEight = liveTable.slice(0, 8);
  const isHome = fixture.homeAway === "Home";

  return (
    <div className="min-h-screen bg-slate-950 text-white relative overflow-hidden p-3 sm:p-6">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(20,184,166,0.2),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(250,204,21,0.1),_transparent_30%),linear-gradient(135deg,_#020617_0%,_#0f172a_60%,_#042f2e_100%)]" />
      <div className="absolute inset-0 opacity-[0.06] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:46px_46px]" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-5">
          <div className="inline-flex items-center gap-2 rounded-full border border-teal-400/40 bg-teal-500/10 px-4 py-2 mb-4">
            <span className="h-2 w-2 rounded-full bg-teal-400" />
            <p className="text-xs font-black tracking-[3px] text-teal-300 uppercase">
              Live Match Centre
            </p>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black">
            Matchday {fixture.matchNumber}
          </h1>

          <p className="text-slate-400 mt-2 text-sm sm:text-base">
            Season simulation in progress
          </p>
        </div>

        <div className="mb-5 rounded-[2rem] border border-slate-800 bg-slate-900/80 backdrop-blur p-4 shadow-2xl shadow-black/30">
          <div className="flex items-center justify-between text-sm mb-3">
            <div>
              <p className="font-black text-slate-200">Season Progress</p>
              <p className="text-xs text-slate-500">
                {progressPercent}% complete
              </p>
            </div>

            <div className="rounded-2xl border border-slate-700 bg-slate-950 px-4 py-2 text-right">
              <p className="text-xs text-slate-500 font-black">MATCH</p>
              <p className="font-black text-teal-300">
                {fixture.matchNumber}/38
              </p>
            </div>
          </div>

          <div className="h-3 w-full rounded-full bg-slate-950 overflow-hidden border border-slate-800">
            <div
              className={`h-full rounded-full ${config.progress} transition-all duration-700`}
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-[1fr_0.85fr_0.8fr] gap-5 items-start">
          <section
            className={`rounded-[2rem] border ${config.border} ${config.bg} p-5 sm:p-7 shadow-2xl shadow-black/30`}
          >
            <div className="flex items-center justify-between gap-4 mb-6">
              <div>
                <p className="text-xs text-slate-400 font-black uppercase tracking-[3px]">
                  {isHome ? "Home Fixture" : "Away Fixture"}
                </p>

                <h2 className="text-3xl sm:text-4xl font-black mt-1">
                  UnbeatenXI
                </h2>

                <p className="text-slate-400 mt-1">
                  vs {fixture.opponent}
                </p>
              </div>

              <div className={`rounded-2xl px-5 py-3 text-center ${config.badge}`}>
                <p className="text-xs font-black">RESULT</p>
                <p className="text-2xl font-black">{config.label}</p>
              </div>
            </div>

            <div className="rounded-[2rem] border border-slate-800 bg-slate-950/80 p-5 sm:p-7 mb-5">
              <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 sm:gap-6">
                <TeamScore label="UnbeatenXI" subLabel="YOU" goals={fixture.userGoals} align="right" />

                <div className="flex flex-col items-center">
                  <div className="rounded-full border border-slate-700 bg-slate-900 px-4 py-2 text-xs font-black text-slate-400">
                    FT
                  </div>

                  <p className="text-4xl sm:text-5xl font-black text-slate-600 mt-3">
                    -
                  </p>
                </div>

                <TeamScore
                  label={fixture.opponent}
                  subLabel={isHome ? "AWAY" : "HOME"}
                  goals={fixture.opponentGoals}
                  align="left"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <MatchInfoCard title="Points" value={fixture.currentPoints} />
              <MatchInfoCard title="Position" value={`${fixture.userLivePosition}`} />
              <MatchInfoCard title="Projected" value={`${fixture.projectedPoints}`} />
            </div>

            <div className="mt-4 rounded-2xl border border-slate-800 bg-slate-950/80 p-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs text-slate-500 font-black uppercase">
                    Last 5 Form
                  </p>

                  <div className="mt-2 flex gap-2">
                    {(fixture.recentForm || []).map((result, index) => (
                      <FormDot key={`${result}-${index}`} result={result} />
                    ))}
                  </div>
                </div>

                <MovementBadge movement={fixture.userPositionMovement} />
              </div>
            </div>
          </section>

          <section className="rounded-[2rem] border border-slate-800 bg-slate-900/80 backdrop-blur p-5 sm:p-6 shadow-2xl shadow-black/30">
            <div className="flex items-center justify-between gap-4 mb-5">
              <div>
                <p className="text-xs text-teal-300 font-black uppercase tracking-[3px]">
                  Match Events
                </p>
                <h2 className="text-2xl sm:text-3xl font-black">Goals</h2>
              </div>

              <div className="rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-center">
                <p className="text-xs text-slate-500 font-black">TOTAL</p>
                <p className="text-2xl font-black">
                  {fixture.goalEvents.length}
                </p>
              </div>
            </div>

            {fixture.goalEvents.length === 0 ? (
              <div className="rounded-[1.5rem] border border-slate-800 bg-slate-950 p-6 text-center">
                <div className="mx-auto mb-4 h-14 w-14 rounded-2xl border border-slate-700 bg-slate-900 flex items-center justify-center text-2xl">
                  🧤
                </div>

                <p className="font-black text-lg">No UnbeatenXI Goals</p>

                <p className="text-sm text-slate-400 mt-1">
                  Your team failed to score in this fixture.
                </p>
              </div>
            ) : (
              <div className="space-y-3 max-h-[390px] overflow-y-auto pr-1">
                {fixture.goalEvents.map((goal, index) => (
                  <div
                    key={`${goal.scorer}-${index}`}
                    className="rounded-[1.4rem] border border-slate-800 bg-slate-950 p-4"
                  >
                    <div className="flex items-start gap-3">
                      <div className="shrink-0 h-11 w-11 rounded-2xl bg-teal-500 text-white flex items-center justify-center font-black">
                        ⚽
                      </div>

                      <div className="min-w-0">
                        <p className="text-xs text-teal-300 font-black uppercase tracking-[2px]">
                          Goal {index + 1}
                        </p>

                        <p className="font-black text-lg leading-tight">
                          {goal.scorer}
                        </p>

                        {goal.assist && (
                          <p className="text-sm text-slate-400 mt-1">
                            🎯 Assist:{" "}
                            <span className="text-slate-200 font-bold">
                              {goal.assist}
                            </span>
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <button
              onClick={onSkipToFinalTable}
              className="mt-5 w-full rounded-2xl border border-teal-400/60 bg-teal-500/10 px-6 py-4 font-black text-teal-300 hover:bg-teal-500 hover:text-white hover:-translate-y-1 transition"
            >
              Skip To Final Table →
            </button>
          </section>

          <section className="rounded-[2rem] border border-slate-800 bg-slate-900/80 backdrop-blur p-5 sm:p-6 shadow-2xl shadow-black/30">
            <div className="flex items-center justify-between gap-4 mb-5">
              <div>
                <p className="text-xs text-teal-300 font-black uppercase tracking-[3px]">
                  Live Table
                </p>
                <h2 className="text-2xl sm:text-3xl font-black">Top 8</h2>
              </div>

              <div className="rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-center">
                <p className="text-xs text-slate-500 font-black">YOU</p>
                <p className="text-2xl font-black text-teal-300">
                  {fixture.userLivePosition}
                </p>
              </div>
            </div>

            <div className="space-y-2">
              {topEight.map((team) => {
                const isUserTeam = team.club === "UnbeatenXI";

                return (
                  <div
                    key={team.club}
                    className={`grid grid-cols-[32px_1fr_38px_26px] items-center gap-2 rounded-2xl border px-3 py-3 text-sm ${
                      isUserTeam
                        ? "border-teal-400 bg-teal-500/15 text-white"
                        : "border-slate-800 bg-slate-950 text-slate-300"
                    }`}
                  >
                    <p className="font-black">{team.position}</p>

                    <div className="min-w-0">
                      <p className="font-black truncate">{team.club}</p>
                      <p className="text-xs text-slate-500">
                        {team.played} played
                      </p>
                    </div>

                    <p className="text-right font-black">{team.points}</p>

                    <TableMovement movement={team.movement} />
                  </div>
                );
              })}
            </div>

            <div className="mt-4 rounded-2xl border border-slate-800 bg-slate-950 p-4">
              <p className="text-xs text-slate-500 font-black uppercase">
                Table movement
              </p>
              <p className="text-sm text-slate-400 mt-1">
                ↑ moved up • ↓ dropped • — unchanged
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

function TeamScore({ label, subLabel, goals, align }) {
  const alignment = align === "right" ? "text-right" : "text-left";

  return (
    <div className={alignment}>
      <p className="text-xs text-slate-500 font-black uppercase tracking-[2px]">
        {subLabel}
      </p>

      <p className="text-sm sm:text-lg font-black text-slate-200 leading-tight truncate">
        {label}
      </p>

      <p className="text-6xl sm:text-8xl font-black text-white mt-2">
        {goals}
      </p>
    </div>
  );
}

function MatchInfoCard({ title, value }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4 text-center">
      <p className="text-xs text-slate-500 font-black uppercase">{title}</p>
      <p className="font-black text-slate-200 mt-1">{value}</p>
    </div>
  );
}

function FormDot({ result }) {
  const styles = {
    win: "bg-green-400 text-slate-950",
    draw: "bg-yellow-400 text-slate-950",
    loss: "bg-red-400 text-white",
  };

  const labels = {
    win: "W",
    draw: "D",
    loss: "L",
  };

  return (
    <span
      className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-black ${
        styles[result] || styles.draw
      }`}
    >
      {labels[result] || "D"}
    </span>
  );
}

function MovementBadge({ movement }) {
  const label =
    movement === "up" ? "Moving Up" : movement === "down" ? "Dropped" : "Same";

  const style =
    movement === "up"
      ? "border-green-400 bg-green-400/10 text-green-300"
      : movement === "down"
      ? "border-red-400 bg-red-400/10 text-red-300"
      : "border-slate-700 bg-slate-950 text-slate-400";

  return (
    <div className={`rounded-2xl border px-4 py-3 text-center ${style}`}>
      <p className="text-xs font-black uppercase">Position</p>
      <p className="font-black">{label}</p>
    </div>
  );
}

function TableMovement({ movement }) {
  if (movement === "up") {
    return <p className="text-green-300 font-black text-center">↑</p>;
  }

  if (movement === "down") {
    return <p className="text-red-300 font-black text-center">↓</p>;
  }

  return <p className="text-slate-500 font-black text-center">—</p>;
}

export default LiveResultsScreen;