function ResultsScreen({
  seasonData,
  userTeam,
  achievements,
  copied,
  onCopyResult,
  onStartNewDraft,
}) {
  const cleanSheetLeader = seasonData.cleanSheetLeader;

  function getVerdict() {
    if (userTeam.position === 1 && userTeam.losses === 0) {
      return {
        title: "Invincible Season",
        message: "You won the league without losing a single match.",
        badge: "🏆",
      };
    }

    if (userTeam.position === 1) {
      return {
        title: "League Champions",
        message: "Your XI had enough quality to finish top of the table.",
        badge: "🥇",
      };
    }

    if (userTeam.position <= 4) {
      return {
        title: "Elite Campaign",
        message: "A top-four finish. Your squad can compete with the best.",
        badge: "⭐",
      };
    }

    if (userTeam.position <= 7) {
      return {
        title: "European Push",
        message: "A strong season, but not quite enough for the title race.",
        badge: "🔥",
      };
    }

    if (userTeam.position <= 12) {
      return {
        title: "Mid-table Finish",
        message: "Solid, but this XI needs more chemistry or star quality.",
        badge: "⚖️",
      };
    }

    return {
      title: "Rebuild Needed",
      message: "The season exposed some weaknesses. Time to draft again.",
      badge: "🔁",
    };
  }

  const verdict = getVerdict();

  return (
    <div className="min-h-screen bg-slate-950 text-white px-3 py-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-6 sm:mb-8">
          <p className="text-teal-400 font-black tracking-[4px] mb-3">
            UNBEATEN XI
          </p>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black">
            Final Results
          </h1>

          <p className="text-slate-400 mt-3">
            Your 38-game season is complete.
          </p>
        </div>

        <div className="rounded-3xl border border-teal-400 bg-gradient-to-br from-teal-500/20 to-slate-900 p-5 sm:p-8 mb-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-center">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-4 mb-4">
                <div className="h-16 w-16 rounded-3xl bg-slate-950 border border-slate-700 flex items-center justify-center text-4xl">
                  {verdict.badge}
                </div>

                <div>
                  <p className="text-sm text-teal-400 font-black uppercase tracking-[3px]">
                    Season Verdict
                  </p>
                  <h2 className="text-3xl sm:text-4xl font-black">
                    {verdict.title}
                  </h2>
                </div>
              </div>

              <p className="text-slate-300 text-lg">{verdict.message}</p>
            </div>

            <div className="rounded-3xl bg-slate-950/80 border border-slate-700 p-5 text-center">
              <p className="text-slate-400 text-sm font-bold uppercase">
                Final Position
              </p>
              <p className="text-7xl font-black text-teal-400">
                {userTeam.position}
              </p>
              <p className="text-slate-500 text-sm">out of 20</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-6 gap-3 mb-6">
          <StatCard label="Points" value={userTeam.points} />
          <StatCard label="Wins" value={userTeam.wins} />
          <StatCard label="Draws" value={userTeam.draws} />
          <StatCard label="Losses" value={userTeam.losses} />
          <StatCard label="Goals For" value={userTeam.goalsFor} />
          <StatCard label="Goal Diff" value={userTeam.goalDifference} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-5 sm:p-6">
            <h2 className="text-2xl font-black mb-4">Season Summary</h2>

            <div className="space-y-3">
              <SummaryRow label="Position" value={userTeam.position} />
              <SummaryRow label="Points" value={userTeam.points} />
              <SummaryRow
                label="Record"
                value={`${userTeam.wins}W ${userTeam.draws}D ${userTeam.losses}L`}
              />
              <SummaryRow label="Goals For" value={userTeam.goalsFor} />
              <SummaryRow label="Goals Against" value={userTeam.goalsAgainst} />
              <SummaryRow
                label="Goal Difference"
                value={userTeam.goalDifference}
              />
            </div>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-5 sm:p-6">
            <h2 className="text-2xl font-black mb-4">Player Awards</h2>

            <AwardCard
              icon="⚽"
              label="Top Goalscorer"
              name={seasonData.topScorer.name}
              stat={`${seasonData.topScorer.goals} goals`}
            />

            <AwardCard
              icon="🎯"
              label="Top Assister"
              name={seasonData.topAssister.name}
              stat={`${seasonData.topAssister.assists} assists`}
            />

            <AwardCard
              icon="🧤"
              label="Most Clean Sheets"
              name={cleanSheetLeader.name}
              stat={`${cleanSheetLeader.cleanSheets} clean sheets`}
            />
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-5 sm:p-6">
            <h2 className="text-2xl font-black mb-4">Share Result</h2>

            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4 mb-4">
              <p className="text-sm text-slate-400 mb-1">Share line</p>
              <p className="font-black">
                I finished {userTeam.position}
                {getPositionSuffix(userTeam.position)} with {userTeam.points}{" "}
                points on UnbeatenXI.
              </p>
            </div>

            <div className="flex flex-wrap gap-2 mb-5">
              {achievements.length > 0 ? (
                achievements.map((achievement) => (
                  <span
                    key={achievement}
                    className="rounded-full bg-teal-500 px-4 py-2 text-xs font-black"
                  >
                    {achievement}
                  </span>
                ))
              ) : (
                <span className="rounded-full bg-slate-800 px-4 py-2 text-xs font-bold text-slate-400">
                  No badges earned
                </span>
              )}
            </div>

            <button
              onClick={() => onCopyResult(userTeam)}
              className="w-full rounded-xl bg-teal-500 px-6 py-4 font-black text-white hover:bg-teal-400 transition"
            >
              {copied ? "Copied!" : "Copy Share Result"}
            </button>

            <button
              onClick={onStartNewDraft}
              className="mt-3 w-full rounded-xl border border-slate-700 px-6 py-4 font-black text-slate-300 hover:border-teal-400 hover:text-white transition"
            >
              Start New Draft
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-5 sm:p-6 overflow-x-auto">
            <h2 className="text-2xl font-black mb-4">Player Stats</h2>

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
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-5 sm:p-6 overflow-x-auto">
            <h2 className="text-2xl font-black mb-4">League Table</h2>

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
                    team.club === "UnbeatenXI" ||
                    team.club === userTeam.club;

                  return (
                    <tr
                      key={team.club}
                      className={`border-t border-slate-800 ${
                        isUserTeam
                          ? "bg-teal-500/20 text-white font-black"
                          : ""
                      }`}
                    >
                      <td className="py-3 pr-4">{team.position}</td>
                      <td className="pr-4 whitespace-nowrap">{team.club}</td>
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
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4 text-center">
      <p className="text-slate-400 text-xs font-bold uppercase">{label}</p>
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

function AwardCard({ icon, label, name, stat }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4 mb-3">
      <div className="flex items-center gap-3">
        <div className="h-11 w-11 rounded-2xl bg-slate-900 flex items-center justify-center text-2xl">
          {icon}
        </div>

        <div>
          <p className="text-xs text-slate-400 font-bold uppercase">{label}</p>
          <p className="font-black leading-tight">{name}</p>
          <p className="text-teal-400 text-sm font-bold">{stat}</p>
        </div>
      </div>
    </div>
  );
}

function getPositionSuffix(position) {
  if (position === 1) return "st";
  if (position === 2) return "nd";
  if (position === 3) return "rd";
  return "th";
}

export default ResultsScreen;