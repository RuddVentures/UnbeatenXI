function ResultsScreen({ seasonData, userTeam, achievements, copied, onCopyResult, onStartNewDraft }) {
  const cleanSheetLeader = seasonData.cleanSheetLeader;

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <p className="text-teal-400 font-bold tracking-[4px] mb-3">ULTIMATE 38</p>
          <h1 className="text-4xl md:text-6xl font-black">Final Results</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="text-2xl font-black mb-4">Season Summary</h2>

            <div className="space-y-3">
              <p>Position: <span className="font-black">{userTeam.position}</span></p>
              <p>Points: <span className="font-black">{userTeam.points}</span></p>
              <p>Record: <span className="font-black">{userTeam.wins}W {userTeam.draws}D {userTeam.losses}L</span></p>
              <p>Goals For: <span className="font-black">{userTeam.goalsFor}</span></p>
              <p>Goals Against: <span className="font-black">{userTeam.goalsAgainst}</span></p>
              <p>Goal Difference: <span className="font-black">{userTeam.goalDifference}</span></p>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="text-2xl font-black mb-4">Player Awards</h2>

            <div className="space-y-4">
              <div>
                <p className="text-sm text-slate-400">Top Goalscorer</p>
                <p className="font-black">{seasonData.topScorer.name}</p>
                <p className="text-teal-400 font-bold">{seasonData.topScorer.goals} goals</p>
              </div>

              <div>
                <p className="text-sm text-slate-400">Top Assists</p>
                <p className="font-black">{seasonData.topAssister.name}</p>
                <p className="text-teal-400 font-bold">{seasonData.topAssister.assists} assists</p>
              </div>

              <div>
                <p className="text-sm text-slate-400">Most Clean Sheets</p>
                <p className="font-black">{cleanSheetLeader.name}</p>
                <p className="text-teal-400 font-bold">{cleanSheetLeader.cleanSheets} clean sheets</p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="text-2xl font-black mb-4">Season Badges</h2>

            <div className="flex flex-wrap gap-2">
              {achievements.map((achievement) => (
                <span key={achievement} className="rounded-full bg-teal-500 px-4 py-2 text-sm font-bold">
                  {achievement}
                </span>
              ))}
            </div>

            <button onClick={() => onCopyResult(userTeam)} className="mt-6 w-full rounded-xl bg-teal-500 px-6 py-4 font-bold text-white hover:bg-teal-400">
              {copied ? "Copied!" : "Copy Result"}
            </button>

            <button onClick={onStartNewDraft} className="mt-3 w-full rounded-xl border border-slate-700 px-6 py-4 font-bold text-slate-300 hover:border-teal-400 hover:text-white">
              Start New Draft
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 overflow-x-auto">
            <h2 className="text-2xl font-black mb-4">Player Stats</h2>

            <table className="w-full text-left text-sm">
              <thead className="text-slate-400">
                <tr>
                  <th className="py-2">Player</th>
                  <th>Pos</th>
                  <th>G</th>
                  <th>A</th>
                  <th>CS</th>
                  <th>Rat</th>
                </tr>
              </thead>

              <tbody>
                {seasonData.playerStats.map((player) => (
                  <tr key={player.id} className="border-t border-slate-800">
                    <td className="py-2 font-bold">{player.name}</td>
                    <td>{player.position}</td>
                    <td>{player.goals}</td>
                    <td>{player.assists}</td>
                    <td>{player.cleanSheets}</td>
                    <td>{player.rating}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 overflow-x-auto">
            <h2 className="text-2xl font-black mb-4">League Table</h2>

            <table className="w-full text-left text-sm">
              <thead className="text-slate-400">
                <tr>
                  <th className="py-2">#</th>
                  <th>Club</th>
                  <th>Pts</th>
                  <th>W</th>
                  <th>D</th>
                  <th>L</th>
                  <th>GF</th>
                  <th>GA</th>
                  <th>GD</th>
                </tr>
              </thead>

              <tbody>
                {seasonData.table.map((team) => (
                  <tr
                    key={team.club}
                    className={`border-t border-slate-800 ${
                      team.club === "Your Ultimate XI" ? "bg-teal-500/20 text-white font-bold" : ""
                    }`}
                  >
                    <td className="py-2">{team.position}</td>
                    <td>{team.club}</td>
                    <td>{team.points}</td>
                    <td>{team.wins}</td>
                    <td>{team.draws}</td>
                    <td>{team.losses}</td>
                    <td>{team.goalsFor}</td>
                    <td>{team.goalsAgainst}</td>
                    <td>{team.goalDifference}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResultsScreen;