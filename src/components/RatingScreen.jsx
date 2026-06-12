function getChemistryBoost(chemistryRating) {
  if (chemistryRating >= 80) return 4;
  if (chemistryRating >= 60) return 2;
  if (chemistryRating >= 40) return 0;
  if (chemistryRating >= 20) return -2;
  return -4;
}

function getTeamTier(overall) {
  if (overall >= 95) return "Invincible Candidate";
  if (overall >= 92) return "Title Favourite";
  if (overall >= 89) return "Champions League Quality";
  if (overall >= 86) return "European Challenge";
  if (overall >= 83) return "Mid-table Quality";
  return "Relegation Fight";
}

function getExpectations(overall, chemistry) {
  const expectations = [];

  if (overall >= 95) {
    expectations.push("Potential invincible season");
    expectations.push("Title should be the target");
  } else if (overall >= 92) {
    expectations.push("Title challenge expected");
    expectations.push("Top 2 should be realistic");
  } else if (overall >= 89) {
    expectations.push("Top 4 expected");
    expectations.push("Could challenge for the title with strong chemistry");
  } else if (overall >= 86) {
    expectations.push("European places expected");
    expectations.push("Needs good results against big teams");
  } else if (overall >= 83) {
    expectations.push("Mid-table finish expected");
    expectations.push("A top-half finish would be strong");
  } else {
    expectations.push("Survival could be difficult");
    expectations.push("Needs a better draft or stronger chemistry");
  }

  if (chemistry >= 80) expectations.push("Elite chemistry boost active");
  else if (chemistry >= 60) expectations.push("Good chemistry boost active");
  else if (chemistry < 40) expectations.push("Poor chemistry may hurt results");

  return expectations;
}

function RatingScreen({ ratings, onRunSimulation }) {
  const chemistryBoost = getChemistryBoost(ratings.chemistryRating);
  const boostedOverall = ratings.overallRating + chemistryBoost;
  const teamTier = getTeamTier(boostedOverall);
  const expectations = getExpectations(boostedOverall, ratings.chemistryRating);

  return (
    <div className="min-h-screen bg-slate-950 text-white px-3 py-4 sm:p-6">
      <div className="max-w-6xl mx-auto text-center">
        <p className="text-teal-400 font-black tracking-[4px] mb-3">
          UNBEATEN XI
        </p>

        <h1 className="text-4xl sm:text-5xl md:text-7xl font-black mb-6">
          Team Rating
        </h1>

        <div className="rounded-3xl border border-teal-400 bg-gradient-to-br from-teal-500/20 to-slate-900 p-5 sm:p-8 mb-6">
          <p className="text-sm font-black uppercase text-teal-400 mb-2">
            Overall Team Tier
          </p>

          <h2 className="text-3xl sm:text-5xl font-black mb-4">{teamTier}</h2>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 text-3xl sm:text-5xl font-black">
            <span>{ratings.overallRating}</span>
            <span
              className={chemistryBoost >= 0 ? "text-green-400" : "text-red-400"}
            >
              {chemistryBoost > 0
                ? `+ ${chemistryBoost}`
                : chemistryBoost < 0
                ? `- ${Math.abs(chemistryBoost)}`
                : "+ 0"}
            </span>
            <span>=</span>
            <span className="text-teal-400">{boostedOverall}</span>
          </div>

          <p className="text-slate-400 text-sm mt-4">
            Chemistry now has a stronger effect on your season simulation.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-6 gap-3 mb-6">
          <RatingCard label="Base Overall" value={ratings.overallRating} highlight />
          <RatingCard label="Attack" value={ratings.attackRating} />
          <RatingCard label="Midfield" value={ratings.midfieldRating} />
          <RatingCard label="Defence" value={ratings.defenceRating} />
          <RatingCard label="Goalkeeper" value={ratings.goalkeeperRating} />
          <RatingCard label="Chemistry" value={ratings.chemistryRating} chemistry />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8 text-left">
          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-5 sm:p-6">
            <h2 className="text-2xl font-black mb-4">Season Expectations</h2>

            <div className="space-y-3">
              {expectations.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-slate-800 bg-slate-950 p-4"
                >
                  <p className="font-bold text-slate-200">✓ {item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-5 sm:p-6">
            <h2 className="text-2xl font-black mb-4">Chemistry Impact</h2>

            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 text-sm">
              <ChemCard range="80-100" boost="+4" good />
              <ChemCard range="60-79" boost="+2" good />
              <ChemCard range="40-59" boost="0" />
              <ChemCard range="20-39" boost="-2" bad />
              <ChemCard range="0-19" boost="-4" bad />
            </div>

            <p className="text-slate-400 text-sm mt-4">
              Strong chemistry can turn a good XI into a title challenger. Poor
              chemistry can make even talented squads underperform.
            </p>
          </div>
        </div>

        <button
          onClick={onRunSimulation}
          className="rounded-xl bg-teal-500 px-10 py-5 text-lg font-black text-white hover:bg-teal-400"
        >
          Simulate 38 Game Season
        </button>
      </div>
    </div>
  );
}

function RatingCard({ label, value, highlight, chemistry }) {
  return (
    <div
      className={`rounded-2xl border p-4 text-center ${
        highlight
          ? "border-teal-400 bg-teal-500"
          : chemistry
          ? "border-yellow-400 bg-slate-900"
          : "border-slate-800 bg-slate-900"
      }`}
    >
      <p
        className={`text-xs font-black uppercase ${
          highlight ? "text-white" : chemistry ? "text-yellow-400" : "text-slate-400"
        }`}
      >
        {label}
      </p>
      <p className="text-4xl font-black mt-2">{value}</p>
    </div>
  );
}

function ChemCard({ range, boost, good, bad }) {
  return (
    <div
      className={`rounded-xl border p-3 ${
        good
          ? "border-green-700 bg-green-950/30"
          : bad
          ? "border-red-800 bg-red-950/30"
          : "border-slate-700 bg-slate-950"
      }`}
    >
      <p
        className={`font-black ${
          good ? "text-green-400" : bad ? "text-red-400" : "text-slate-300"
        }`}
      >
        {range}
      </p>
      <p>{boost}</p>
    </div>
  );
}

export default RatingScreen;