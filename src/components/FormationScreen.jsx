function FormationScreen({ formations, formation, onSelectFormation, onContinue }) {
  return (
    <div className="min-h-screen bg-slate-950 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(20,184,166,0.2),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(250,204,21,0.12),_transparent_30%),linear-gradient(135deg,_#020617_0%,_#0f172a_60%,_#042f2e_100%)]" />
      <div className="absolute inset-0 opacity-[0.07] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:46px_46px]" />

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-8 sm:p-6">
        <div className="max-w-7xl w-full">
          <div className="text-center mb-8 sm:mb-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-teal-400/40 bg-teal-500/10 px-4 py-2 mb-5">
              <span className="h-2 w-2 rounded-full bg-teal-400" />
              <p className="text-xs font-black tracking-[3px] text-teal-300 uppercase">
                UnbeatenXI
              </p>
            </div>

            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black mb-4">
              Choose Formation
            </h1>

            <p className="text-slate-300 text-base sm:text-lg">
              Your shape affects the positions you draft and how your XI feels.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {formations.map((item) => {
              const active = formation === item;

              return (
                <button
                  key={item}
                  onClick={() => onSelectFormation(item)}
                  className={`group relative overflow-hidden rounded-[2rem] border p-5 sm:p-6 text-left transition shadow-2xl ${
                    active
                      ? "border-teal-300 bg-slate-900 shadow-teal-500/20 scale-[1.01]"
                      : "border-slate-800 bg-slate-900/75 hover:border-teal-400 hover:-translate-y-1"
                  }`}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br from-teal-400/20 to-yellow-400/5 ${
                      active ? "opacity-100" : "opacity-40 group-hover:opacity-80"
                    } transition`}
                  />

                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-5">
                      <p className="text-xs text-slate-400 font-black uppercase tracking-[2px]">
                        Formation
                      </p>

                      <div
                        className={`h-8 w-8 rounded-full border flex items-center justify-center ${
                          active
                            ? "border-teal-300 bg-teal-400 text-slate-950"
                            : "border-slate-700 bg-slate-950 text-slate-500"
                        }`}
                      >
                        ✓
                      </div>
                    </div>

                    <p className="text-4xl font-black mb-5">{item}</p>

                    <MiniPitch formation={item} active={active} />

                    <p className="mt-5 text-sm text-slate-400">
                      {getFormationDescription(item)}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="text-center min-h-[72px]">
            {formation && (
              <button
                onClick={onContinue}
                className="group rounded-2xl bg-teal-500 px-12 py-5 text-lg font-black text-white shadow-2xl shadow-teal-500/25 hover:bg-teal-400 hover:-translate-y-1 transition"
              >
                Continue To Draft
                <span className="inline-block ml-2 group-hover:translate-x-1 transition">
                  →
                </span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function MiniPitch({ formation, active }) {
  const rows = getPitchRows(formation);

  return (
    <div
      className={`rounded-2xl border p-3 ${
        active
          ? "border-teal-400/60 bg-teal-400/10"
          : "border-slate-800 bg-slate-950"
      }`}
    >
      <div className="rounded-xl border border-slate-700/70 p-3 space-y-2">
        {rows.map((row, rowIndex) => (
          <div key={`${formation}-${rowIndex}`} className="flex justify-center gap-2">
            {Array.from({ length: row }).map((_, index) => (
              <span
                key={`${formation}-${rowIndex}-${index}`}
                className={`h-2.5 w-2.5 rounded-full ${
                  active ? "bg-teal-300" : "bg-slate-600"
                }`}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function getPitchRows(formation) {
  const map = {
    "4-3-3": [3, 3, 4, 1],
    "4-4-2": [2, 4, 4, 1],
    "4-2-3-1": [1, 3, 2, 4, 1],
    "3-5-2": [2, 5, 3, 1],
    "5-2-3": [3, 2, 5, 1],
    "3-4-3": [3, 4, 3, 1],
    "4-1-2-1-2": [2, 1, 2, 1, 4, 1],
    "2-3-5": [5, 3, 2, 1],
  };

  return map[formation] || [3, 3, 4, 1];
}

function getFormationDescription(formation) {
  const descriptions = {
    "4-3-3": "Balanced, modern and strong out wide.",
    "4-4-2": "Classic shape with two strikers.",
    "4-2-3-1": "Creative midfield with extra control.",
    "3-5-2": "Midfield overload with wing-backs.",
    "5-2-3": "Defensive base with dangerous forwards.",
    "3-4-3": "Aggressive shape with width and risk.",
    "4-1-2-1-2": "Narrow diamond built for chemistry.",
    "2-3-5": "Old-school chaos. Attack first.",
  };

  return descriptions[formation] || "Build your XI around this shape.";
}

export default FormationScreen;