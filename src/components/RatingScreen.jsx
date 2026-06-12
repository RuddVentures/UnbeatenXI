function getChemistryBoost(chemistryRating) {
  if (chemistryRating >= 80) return 3;
  if (chemistryRating >= 60) return 1;
  if (chemistryRating >= 40) return 0;
  if (chemistryRating >= 20) return -1;
  return -3;
}

function RatingScreen({ ratings, onRunSimulation }) {
  const chemistryBoost = getChemistryBoost(ratings.chemistryRating);
  const boostedOverall = ratings.overallRating + chemistryBoost;

  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-6">
      <div className="max-w-5xl w-full text-center">
        <p className="text-teal-400 font-bold tracking-[4px] mb-4">ULTIMATE 38</p>
        <h1 className="text-4xl md:text-6xl font-black mb-8">Team Rating</h1>

        <div className="mb-8 rounded-3xl border border-yellow-400 bg-slate-900 p-6">
          <p className="text-sm font-bold uppercase text-yellow-400 mb-2">
            Chemistry Applied
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-3xl md:text-5xl font-black">
            <span>{ratings.overallRating}</span>
            <span className={chemistryBoost >= 0 ? "text-green-400" : "text-red-400"}>
              {chemistryBoost > 0 ? `+ ${chemistryBoost}` : chemistryBoost < 0 ? `- ${Math.abs(chemistryBoost)}` : "+ 0"}
            </span>
            <span>=</span>
            <span className="text-teal-400">{boostedOverall}</span>
          </div>

          <p className="text-slate-400 text-sm mt-3">
            Your chemistry changes the rating used in the season simulation.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 mb-10">
          <div className="rounded-2xl border border-teal-400 bg-teal-500 p-6">
            <p className="text-sm font-bold uppercase">Base Overall</p>
            <p className="text-5xl font-black mt-2">{ratings.overallRating}</p>
          </div>

          <div className="rounded-2xl border border-slate-700 bg-slate-900 p-6">
            <p className="text-sm font-bold uppercase text-slate-400">Attack</p>
            <p className="text-4xl font-black mt-2">{ratings.attackRating}</p>
          </div>

          <div className="rounded-2xl border border-slate-700 bg-slate-900 p-6">
            <p className="text-sm font-bold uppercase text-slate-400">Midfield</p>
            <p className="text-4xl font-black mt-2">{ratings.midfieldRating}</p>
          </div>

          <div className="rounded-2xl border border-slate-700 bg-slate-900 p-6">
            <p className="text-sm font-bold uppercase text-slate-400">Defence</p>
            <p className="text-4xl font-black mt-2">{ratings.defenceRating}</p>
          </div>

          <div className="rounded-2xl border border-slate-700 bg-slate-900 p-6">
            <p className="text-sm font-bold uppercase text-slate-400">Goalkeeper</p>
            <p className="text-4xl font-black mt-2">{ratings.goalkeeperRating}</p>
          </div>

          <div className="rounded-2xl border border-yellow-400 bg-slate-900 p-6">
            <p className="text-sm font-bold uppercase text-yellow-400">Chemistry</p>
            <p className="text-4xl font-black mt-2">{ratings.chemistryRating}</p>
            <p className={chemistryBoost >= 0 ? "mt-2 text-sm font-black text-green-400" : "mt-2 text-sm font-black text-red-400"}>
              {chemistryBoost > 0 && `+${chemistryBoost} Boost`}
              {chemistryBoost === 0 && "No Boost"}
              {chemistryBoost < 0 && `${chemistryBoost} Penalty`}
            </p>
          </div>
        </div>

        <div className="mb-10 rounded-3xl border border-slate-800 bg-slate-900 p-6 text-left">
          <h2 className="text-2xl font-black mb-3">Chemistry Impact</h2>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-3 text-sm mb-5">
            <div className="rounded-xl border border-green-700 bg-green-950/30 p-3">
              <p className="font-black text-green-400">80-100</p>
              <p>+3 Boost</p>
            </div>

            <div className="rounded-xl border border-green-700 bg-green-950/30 p-3">
              <p className="font-black text-green-400">60-79</p>
              <p>+1 Boost</p>
            </div>

            <div className="rounded-xl border border-slate-700 bg-slate-950 p-3">
              <p className="font-black text-slate-300">40-59</p>
              <p>No Boost</p>
            </div>

            <div className="rounded-xl border border-red-800 bg-red-950/30 p-3">
              <p className="font-black text-red-400">20-39</p>
              <p>-1 Penalty</p>
            </div>

            <div className="rounded-xl border border-red-800 bg-red-950/30 p-3">
              <p className="font-black text-red-400">0-19</p>
              <p>-3 Penalty</p>
            </div>
          </div>

          <p className="text-slate-300 text-sm">
            Same club gives the strongest chemistry. Same nation gives a strong link.
            Same league gives a weak link. Chemistry slightly affects your team during the simulation.
          </p>
        </div>

        <button
          onClick={onRunSimulation}
          className="rounded-xl bg-teal-500 px-10 py-5 text-lg font-bold text-white hover:bg-teal-400"
        >
          Simulate 38 Game Season
        </button>
      </div>
    </div>
  );
}

export default RatingScreen;