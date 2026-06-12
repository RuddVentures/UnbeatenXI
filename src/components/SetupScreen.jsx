function SetupScreen({ difficulty, hideRatings, onDifficultyChange, onToggleHideRatings, onContinue }) {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-6">
      <div className="max-w-4xl w-full text-center">
        <p className="text-teal-400 font-bold tracking-[4px] mb-4">ULTIMATE 38</p>
        <h1 className="text-4xl md:text-6xl font-black mb-4">Draft Settings</h1>
        <p className="text-slate-300 mb-10">Choose how challenging you want the draft to be.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {["easy", "medium", "hard"].map((level) => (
            <button
              key={level}
              onClick={() => onDifficultyChange(level)}
              className={`rounded-2xl border p-6 text-center capitalize ${
                difficulty === level
                  ? "border-teal-400 bg-teal-500 text-white"
                  : "border-slate-700 bg-slate-900 hover:border-teal-400"
              }`}
            >
              <p className="text-2xl font-black">{level}</p>
              <p className="mt-2 text-sm">
                {level === "easy" && "More elite player options"}
                {level === "medium" && "Balanced draft options"}
                {level === "hard" && "More risky lower-rated options"}
              </p>
            </button>
          ))}
        </div>

        <button
          onClick={onToggleHideRatings}
          className={`mb-10 rounded-2xl border px-8 py-5 font-bold ${
            hideRatings
              ? "border-teal-400 bg-teal-500 text-white"
              : "border-slate-700 bg-slate-900 text-slate-300 hover:border-teal-400"
          }`}
        >
          {hideRatings ? "Ratings Hidden: ON" : "Ratings Hidden: OFF"}
        </button>

        <div>
          <button onClick={onContinue} className="rounded-xl bg-teal-500 px-10 py-5 text-lg font-bold text-white hover:bg-teal-400">
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}

export default SetupScreen;