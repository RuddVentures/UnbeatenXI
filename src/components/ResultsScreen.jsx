function calculateUnbeatenXIScore(userTeam, seasonData, achievements) {
  let score = 0;

  score += userTeam.points * 4;
  score += Math.max(0, 21 - userTeam.position) * 10;
  score += userTeam.wins * 3;
  score += Math.max(0, userTeam.goalDifference) * 2;

  if (userTeam.position === 1) score += 120;
  if (userTeam.position <= 4) score += 60;
  if (userTeam.losses === 0) score += 120;
  if (userTeam.position === 1 && userTeam.losses === 0) score += 180;

  score += achievements.length * 20;

  if (seasonData.adjustedUserRating) {
    score += seasonData.adjustedUserRating;
  }

  return Math.max(0, Math.min(1000, Math.round(score)));
}

function getPositionSuffix(position) {
  if (position === 1) return "st";
  if (position === 2) return "nd";
  if (position === 3) return "rd";
  return "th";
}

function getFinishStyle(position, losses) {
  if (position === 1 && losses === 0) {
    return {
      title: "Invincible Champions",
      subtitle: "You won the league without losing a match.",
      badge: "🏆",
      border: "border-yellow-300",
      bg: "bg-yellow-400/10",
      text: "text-yellow-300",
      button: "bg-yellow-400 text-slate-950",
    };
  }

  if (position === 1) {
    return {
      title: "League Champions",
      subtitle: "Your XI finished top of the table.",
      badge: "🥇",
      border: "border-yellow-300",
      bg: "bg-yellow-400/10",
      text: "text-yellow-300",
      button: "bg-yellow-400 text-slate-950",
    };
  }

  if (position <= 4) {
    return {
      title: "Top Four Finish",
      subtitle: "Your XI proved it belongs with the elite.",
      badge: "⭐",
      border: "border-purple-400",
      bg: "bg-purple-500/10",
      text: "text-purple-300",
      button: "bg-purple-500 text-white",
    };
  }

  if (position <= 7) {
    return {
      title: "European Push",
      subtitle: "A strong campaign, but short of the title race.",
      badge: "🔥",
      border: "border-blue-400",
      bg: "bg-blue-500/10",
      text: "text-blue-300",
      button: "bg-blue-500 text-white",
    };
  }

  if (position <= 12) {
    return {
      title: "Mid-table Finish",
      subtitle: "Solid season, but this XI needs more quality.",
      badge: "⚖️",
      border: "border-slate-400",
      bg: "bg-slate-500/10",
      text: "text-slate-300",
      button: "bg-slate-400 text-slate-950",
    };
  }

  return {
    title: "Rebuild Needed",
    subtitle: "The season exposed some weaknesses.",
    badge: "🔁",
    border: "border-orange-500",
    bg: "bg-orange-500/10",
    text: "text-orange-300",
    button: "bg-orange-500 text-white",
  };
}

function ResultsScreen({
  seasonData,
  userTeam,
  achievements,
  copied,
  onCopyResult,
  onStartNewDraft,
}) {
  const cleanSheetLeader = seasonData.cleanSheetLeader;
  const finishStyle = getFinishStyle(userTeam.position, userTeam.losses);

  const unbeatenXIScore = calculateUnbeatenXIScore(
    userTeam,
    seasonData,
    achievements
  );

  return (
    <div className="min-h-screen bg-slate-950 text-white relative overflow-hidden px-3 py-4 sm:p-6">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(20,184,166,0.2),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(250,204,21,0.12),_transparent_30%),linear-gradient(135deg,_#020617_0%,_#0f172a_60%,_#042f2e_100%)]" />
      <div className="absolute inset-0 opacity-[0.06] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:46px_46px]" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-teal-400/40 bg-teal-500/10 px-4 py-2 mb-4">
            <span className="h-2 w-2 rounded-full bg-teal-400" />
            <p className="text-xs font-black tracking-[3px] text-teal-300 uppercase">
              UnbeatenXI Results
            </p>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black">
            Season Complete
          </h1>

          <p className="text-slate-400 mt-3">
            Your 38-game campaign has finished.
          </p>
        </div>

        <section
          className={`relative overflow-hidden rounded-[2rem] border ${finishStyle.border} ${finishStyle.bg} p-5 sm:p-8 mb-6 shadow-2xl shadow-black/40`}
        >
          <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/5 blur-3xl" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1fr_0.75fr_0.75fr] gap-5 items-center">
            <div>
              <div className="flex items-center gap-4 mb-5">
                <div className="h-20 w-20 rounded-[1.75rem] bg-slate-950 border border-slate-700 flex items-center justify-center text-5xl">
                  {finishStyle.badge}
                </div>

                <div>
                  <p className={`text-sm font-black uppercase tracking-[3px] ${finishStyle.text}`}>
                    Final Verdict
                  </p>

                  <h2 className="text-3xl sm:text-5xl font-black">
                    {finishStyle.title}
                  </h2>
                </div>
              </div>

              <p className="text-slate-300 text-lg">{finishStyle.subtitle}</p>
            </div>

            <div className="rounded-[2rem] bg-slate-950/80 border border-slate-700 p-5 text-center">
              <p className="text-slate-400 text-sm font-black uppercase">
                Final Position
              </p>

              <p className={`text-7xl sm:text-8xl font-black ${finishStyle.text}`}>
                {userTeam.position}
              </p>

              <p className="text-slate-500 text-sm">
                {userTeam.position}
                {getPositionSuffix(userTeam.position)} place
              </p>
            </div>

            <div className="rounded-[2rem] bg-slate-950/80 border border-yellow-400 p-5 text-center">
              <p className="text-yellow-300 text-sm font-black uppercase tracking-[3px]">
                UnbeatenXI Score
              </p>

              <p className="text-7xl sm:text-8xl font-black text-yellow-300">
                {unbeatenXIScore}
              </p>

              <p className="text-slate-500 text-sm">out of 1000</p>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-2 lg:grid-cols-6 gap-3 mb-6">
          <StatCard label="Points" value={userTeam.points} highlight />
          <StatCard label="Wins" value={userTeam.wins} />
          <StatCard label="Draws" value={userTeam.draws} />
          <StatCard label="Losses" value={userTeam.losses} />
          <StatCard label="Goals For" value={userTeam.goalsFor} />
          <StatCard label="Goal Diff" value={userTeam.goalDifference} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr_1fr] gap-6 mb-6">
          <section className="rounded-[2rem] border border-slate-800 bg-slate-900/80 backdrop-blur p-5 sm:p-6 shadow-2xl shadow-black/30">
            <p className="text-xs text-teal-300 font-black uppercase tracking-[3px] mb-2">
              Season Summary
            </p>

            <h2 className="text-2xl font-black mb-5">Campaign Record</h2>

            <div className="space-y-3">
              <SummaryRow label="Position" value={`${userTeam.position}${getPositionSuffix(userTeam.position)}`} />
              <SummaryRow label="Points" value={userTeam.points} />
              <SummaryRow
                label="Record"
                value={`${userTeam.wins}W ${userTeam.draws}D ${userTeam.losses}L`}
              />
              <SummaryRow label="Goals For" value={userTeam.goalsFor} />
              <SummaryRow label="Goals Against" value={userTeam.goalsAgainst} />
              <SummaryRow label="Goal Difference" value={userTeam.goalDifference} />
            </div>
          </section>

          <section className="rounded-[2rem] border border-slate-800 bg-slate-900/80 backdrop-blur p-5 sm:p-6 shadow-2xl shadow-black/30">
            <p className="text-xs text-teal-300 font-black uppercase tracking-[3px] mb-2">
              Player Awards
            </p>

            <h2 className="text-2xl font-black mb-5">Top Performers</h2>

            <div className="space-y-3">
              <AwardCard
                icon="⚽"
                label="Top Goalscorer"
                name={seasonData.topScorer.name}
                stat={`${seasonData.topScorer.goals} goals`}
                colour="teal"
              />

              <AwardCard
                icon="🎯"
                label="Top Assister"
                name={seasonData.topAssister.name}
                stat={`${seasonData.topAssister.assists} assists`}
                colour="blue"
              />

              <AwardCard
                icon="🧤"
                label="Most Clean Sheets"
                name={cleanSheetLeader.name}
                stat={`${cleanSheetLeader.cleanSheets} clean sheets`}
                colour="yellow"
              />
            </div>
          </section>

          <section className="rounded-[2rem] border border-slate-800 bg-slate-900/80 backdrop-blur p-5 sm:p-6 shadow-2xl shadow-black/30">
            <p className="text-xs text-teal-300 font-black uppercase tracking-[3px] mb-2">
              Challenge Friends
            </p>

            <h2 className="text-2xl font-black mb-5">Share Result</h2>

            <div className="rounded-[1.5rem] border border-slate-800 bg-slate-950 p-5 mb-4 text-center">
              <p className={`text-4xl font-black ${finishStyle.text}`}>
                {userTeam.position}
                {getPositionSuffix(userTeam.position)}
              </p>

              <p className="font-black mt-1">{userTeam.points} points</p>

              <p className="text-sm text-slate-400 mt-2">
                Score:{" "}
                <span className="text-yellow-300 font-black">
                  {unbeatenXIScore}
                </span>
              </p>
            </div>

            <div className="flex flex-wrap gap-2 mb-5">
              {achievements.length > 0 ? (
                achievements.map((achievement) => (
                  <AchievementBadge key={achievement} achievement={achievement} />
                ))
              ) : (
                <span className="rounded-full bg-slate-800 px-4 py-2 text-xs font-bold text-slate-400">
                  No badges earned
                </span>
              )}
            </div>

            <button
              onClick={() => onCopyResult(userTeam)}
              className="w-full rounded-2xl bg-teal-500 px-6 py-4 font-black text-white hover:bg-teal-400 hover:-translate-y-1 transition shadow-xl shadow-teal-500/20"
            >
              {copied ? "Copied!" : "Copy Challenge Result"}
            </button>

            <button
              onClick={onStartNewDraft}
              className="mt-3 w-full rounded-2xl border border-slate-700 bg-slate-950 px-6 py-4 font-black text-slate-300 hover:border-teal-400 hover:text-white hover:-translate-y-1 transition"
            >
              Start New Draft
            </button>
          </section>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <section className="rounded-[2rem] border border-slate-800 bg-slate-900/80 backdrop-blur p-5 sm:p-6 overflow-x-auto shadow-2xl shadow-black/30">
            <p className="text-xs text-teal-300 font-black uppercase tracking-[3px] mb-2">
              Squad Stats
            </p>

            <h2 className="text-2xl font-black mb-5">Player Stats</h2>

            <table className="w-full text-left text-sm">
              <thead className="text-slate-400">
                <tr>
                  <th className="py-2 pr-4">Player</th>
                  <th className="pr-4">Pos</th>
                  <th className="pr-4">G</th>
                  <th className="pr-4">A</th>
                  <th className="pr-4">CS</th>
                  <th>Rat</th>
                </tr>
              </thead>

              <tbody>
                {seasonData.playerStats.map((player) => (
                  <tr key={player.id} className="border-t border-slate-800">
                    <td className="py-3 pr-4 font-bold whitespace-nowrap">
                      {player.name}
                    </td>
                    <td className="pr-4">{player.position}</td>
                    <td className="pr-4">{player.goals}</td>
                    <td className="pr-4">{player.assists}</td>
                    <td className="pr-4">{player.cleanSheets}</td>
                    <td>{player.rating}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <section className="rounded-[2rem] border border-slate-800 bg-slate-900/80 backdrop-blur p-5 sm:p-6 overflow-x-auto shadow-2xl shadow-black/30">
            <p className="text-xs text-teal-300 font-black uppercase tracking-[3px] mb-2">
              Final Standings
            </p>

            <h2 className="text-2xl font-black mb-5">League Table</h2>

            <table className="w-full text-left text-sm">
              <thead className="text-slate-400">
                <tr>
                  <th className="py-2 pr-4">#</th>
                  <th className="pr-4">Club</th>
                  <th className="pr-4">Pts</th>
                  <th className="pr-4">W</th>
                  <th className="pr-4">D</th>
                  <th className="pr-4">L</th>
                  <th className="pr-4">GF</th>
                  <th className="pr-4">GA</th>
                  <th>GD</th>
                </tr>
              </thead>

              <tbody>
                {seasonData.table.map((team) => {
                  const isUserTeam =
                    team.club === "Your Ultimate XI" ||
                    team.club === "Your UnbeatenXI" ||
                    team.club === "UnbeatenXI" ||
                    team.club === userTeam.club;

                  return (
                    <tr
                      key={team.club}
                      className={`border-t border-slate-800 ${
                        isUserTeam
                          ? "bg-teal-500/20 text-white font-black"
                          : team.position === 1
                          ? "text-yellow-300"
                          : team.position <= 4
                          ? "text-purple-300"
                          : "text-slate-300"
                      }`}
                    >
                      <td className="py-3 pr-4 font-black">{team.position}</td>
                      <td className="pr-4 whitespace-nowrap font-bold">
                        {team.club}
                      </td>
                      <td className="pr-4 font-black">{team.points}</td>
                      <td className="pr-4">{team.wins}</td>
                      <td className="pr-4">{team.draws}</td>
                      <td className="pr-4">{team.losses}</td>
                      <td className="pr-4">{team.goalsFor}</td>
                      <td className="pr-4">{team.goalsAgainst}</td>
                      <td>{team.goalDifference}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </section>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, highlight }) {
  return (
    <div
      className={`rounded-2xl border p-4 text-center ${
        highlight
          ? "border-teal-400 bg-teal-500/10"
          : "border-slate-800 bg-slate-900/80"
      }`}
    >
      <p
        className={`text-xs font-black uppercase ${
          highlight ? "text-teal-300" : "text-slate-400"
        }`}
      >
        {label}
      </p>
      <p className="text-3xl font-black mt-1">{value}</p>
    </div>
  );
}

function SummaryRow({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-slate-800 pb-3">
      <p className="text-slate-400">{label}</p>
      <p className="font-black">{value}</p>
    </div>
  );
}

function AwardCard({ icon, label, name, stat, colour }) {
  const colourMap = {
    teal: "border-teal-400 bg-teal-500/10 text-teal-300",
    blue: "border-blue-400 bg-blue-500/10 text-blue-300",
    yellow: "border-yellow-400 bg-yellow-500/10 text-yellow-300",
  };

  return (
    <div className={`rounded-[1.5rem] border p-4 ${colourMap[colour]}`}>
      <div className="flex items-center gap-3">
        <div className="h-12 w-12 rounded-2xl bg-slate-950 flex items-center justify-center text-2xl">
          {icon}
        </div>

        <div className="min-w-0">
          <p className="text-xs font-black uppercase">{label}</p>
          <p className="font-black leading-tight text-white truncate">{name}</p>
          <p className="text-sm font-bold">{stat}</p>
        </div>
      </div>
    </div>
  );
}

function AchievementBadge({ achievement }) {
  return (
    <span className="rounded-full border border-teal-400 bg-teal-500/10 px-4 py-2 text-xs font-black text-teal-300">
      {achievement}
    </span>
  );
}

export default ResultsScreen;