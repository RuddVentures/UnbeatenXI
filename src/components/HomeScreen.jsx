function HomeScreen({ onStartDraft }) {
  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(20,184,166,0.22),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(250,204,21,0.14),_transparent_30%),linear-gradient(135deg,_#020617_0%,_#0f172a_55%,_#042f2e_100%)]" />
      <div className="absolute inset-0 opacity-[0.08] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:48px_48px]" />
      <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-teal-400/20 blur-3xl" />

      <div className="relative z-10 min-h-screen flex flex-col">
        <header className="w-full px-4 sm:px-6 py-5">
          <div className="mx-auto max-w-7xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-11 w-11 rounded-2xl bg-teal-500 shadow-lg shadow-teal-500/25 flex items-center justify-center font-black text-xl">
                XI
              </div>

              <div>
                <p className="font-black leading-none">UnbeatenXI</p>
                <p className="text-xs text-slate-400 font-bold">
                  Football Draft Simulator
                </p>
              </div>
            </div>

            <div className="hidden sm:flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/70 px-4 py-2 text-xs font-black text-slate-300">
              <span className="h-2 w-2 rounded-full bg-green-400" />
              Public Beta
            </div>
          </div>
        </header>

        <main className="flex-1 flex items-center px-4 sm:px-6 py-6">
          <div className="mx-auto max-w-7xl w-full grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-8 lg:gap-12 items-center">
            <section className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 rounded-full border border-teal-400/40 bg-teal-500/10 px-4 py-2 mb-6">
                <span className="h-2 w-2 rounded-full bg-teal-400" />
                <p className="text-xs sm:text-sm font-black tracking-[3px] text-teal-300 uppercase">
                  Draft. Simulate. Survive 38.
                </p>
              </div>

              <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tight leading-[0.9] mb-6">
                Unbeaten
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-teal-400 to-yellow-300">
                  XI
                </span>
              </h1>

              <p className="text-xl sm:text-2xl md:text-3xl font-black text-slate-100 mb-4">
                Build the XI. Chase the perfect season.
              </p>

              <p className="text-slate-400 max-w-2xl mx-auto lg:mx-0 mb-8 text-base sm:text-lg">
                Draft from icons, cult heroes, solid pros and risky squad
                players. Build chemistry, simulate a full 38-game league season
                and see if your team can go unbeaten.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
                <button
                  onClick={onStartDraft}
                  className="group rounded-2xl bg-teal-500 px-10 py-5 text-lg font-black text-white shadow-2xl shadow-teal-500/25 hover:bg-teal-400 hover:-translate-y-1 transition"
                >
                  Start Draft
                  <span className="inline-block ml-2 group-hover:translate-x-1 transition">
                    →
                  </span>
                </button>

                <div className="rounded-2xl border border-slate-700 bg-slate-900/70 backdrop-blur px-6 py-4">
                  <p className="text-xs text-slate-400 font-black uppercase tracking-[2px]">
                    Target
                  </p>
                  <p className="text-lg font-black">Can you go 38-0?</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 max-w-xl mx-auto lg:mx-0">
                <MiniStat value="600+" label="Players" />
                <MiniStat value="38" label="Games" />
                <MiniStat value="0" label="Accounts" />
              </div>
            </section>

            <section className="relative">
              <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-teal-400/20 to-yellow-400/10 blur-2xl" />

              <div className="relative rounded-[2rem] border border-slate-700 bg-slate-900/80 backdrop-blur p-4 sm:p-6 shadow-2xl shadow-black/50">
                <div className="rounded-3xl border border-slate-800 bg-slate-950 p-5 mb-5">
                  <div className="flex items-center justify-between mb-5">
                    <div>
                      <p className="text-xs font-black text-teal-400 uppercase tracking-[3px]">
                        Draft Preview
                      </p>
                      <h2 className="text-2xl font-black">Your XI</h2>
                    </div>

                    <div className="rounded-2xl bg-teal-500 px-4 py-3 text-center">
                      <p className="text-xs font-black">CHEM</p>
                      <p className="text-2xl font-black">87</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <PlayerCard rating="94" name="Elite ST" tier="Gold" />
                    <PlayerCard rating="88" name="Top CM" tier="Purple" />
                    <PlayerCard rating="82" name="Good CB" tier="Blue" />
                    <PlayerCard rating="77" name="Rotation RB" tier="Silver" />
                    <PlayerCard rating="70" name="Weak GK" tier="Bronze" />
                    <PlayerCard rating="?" name="Hidden Pick" tier="Mystery" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-5">
                  <FeatureCard number="01" title="Draft" text="Pick one player per position." />
                  <FeatureCard number="02" title="Chemistry" text="Link clubs, nations and leagues." />
                  <FeatureCard number="03" title="Season" text="Simulate all 38 matches." />
                  <FeatureCard number="04" title="Share" text="Beat your best score." />
                </div>

                <div className="rounded-3xl border border-yellow-400/60 bg-yellow-400/10 p-5">
                  <p className="text-xs font-black text-yellow-300 uppercase tracking-[3px] mb-2">
                    Perfect Season
                  </p>

                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <p className="text-5xl font-black">38-0</p>
                      <p className="text-sm text-slate-400 mt-1">
                        The ultimate UnbeatenXI challenge.
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-xs text-slate-500 font-black">
                        MODE
                      </p>
                      <p className="text-xl font-black text-yellow-300">
                        Draft
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </main>

        <footer className="relative z-10 px-4 sm:px-6 py-5">
          <p className="text-center text-xs text-slate-600">
            UnbeatenXI Beta • Free browser football draft simulator
          </p>
        </footer>
      </div>
    </div>
  );
}

function MiniStat({ value, label }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 text-center">
      <p className="text-2xl font-black text-white">{value}</p>
      <p className="text-xs text-slate-400 font-bold uppercase">{label}</p>
    </div>
  );
}

function PlayerCard({ rating, name, tier }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-3">
      <div className="mb-3 flex items-center justify-between">
        <span className="rounded-lg bg-slate-950 px-2 py-1 text-sm font-black text-teal-300">
          {rating}
        </span>
        <span className="text-[10px] font-black uppercase text-slate-500">
          {tier}
        </span>
      </div>

      <p className="text-sm font-black leading-tight">{name}</p>
    </div>
  );
}

function FeatureCard({ number, title, text }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
      <p className="text-xs font-black text-teal-400 mb-1">{number}</p>
      <h3 className="font-black">{title}</h3>
      <p className="text-xs text-slate-400 mt-1">{text}</p>
    </div>
  );
}

export default HomeScreen;