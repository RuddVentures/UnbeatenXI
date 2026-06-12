function FormationScreen({ formations, formation, onSelectFormation, onContinue }) {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-6">
      <div className="max-w-5xl w-full text-center">
        <p className="text-teal-400 font-bold tracking-[4px] mb-4">ULTIMATE 38</p>
        <h1 className="text-4xl md:text-6xl font-black mb-4">Choose Your Formation</h1>
        <p className="text-slate-300 mb-10">Pick the shape for your Ultimate XI.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {formations.map((item) => (
            <button
              key={item}
              onClick={() => onSelectFormation(item)}
              className={`rounded-2xl border p-8 text-3xl font-black transition ${
                formation === item
                  ? "border-teal-400 bg-teal-500 text-white"
                  : "border-slate-700 bg-slate-900 hover:border-teal-400"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        {formation && (
          <button onClick={onContinue} className="mt-10 rounded-xl bg-teal-500 px-8 py-4 font-bold text-white hover:bg-teal-400">
            Continue
          </button>
        )}
      </div>
    </div>
  );
}

export default FormationScreen;