function HomeScreen({ onStartDraft }) {
  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-teal-950/40" />
      <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-teal-500/20 blur-3xl" />
      <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-yellow-400/10 blur-3xl" />

      <div className="relative z-10 min-h-screen flex items-center justify-center p-6">
        <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="text-center lg:text-left">
            <p className="text-teal-400 font-black tracking-[5px] mb-4">
              FOOTBALL DRAFT SIMULATOR
            </p>

            <h1 className="text-6xl md:text-8xl font-black tracking-tight mb-5">
              Unbeaten<span className="text-teal-400">XI</span>
            </h1>

            <p className="text-2xl md:text-3xl font-bold text-slate-200 mb-4">
              Draft your squad. Build chemistry. Simulate the season.
            </p>

            <p className="text-slate-400 max-w-xl mx-auto lg:mx-0 mb-8">
              Pick your Ultimate XI from football icons, hidden gems and risky rotation players.
              Then see if your team can survive a 38-game league season and go unbeaten.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button
                onClick={onStartDraft}
                className="rounded-2xl bg-teal-500 px-10 py-5 text-lg font-black text-white shadow-2xl shadow-teal-500/20 hover:bg-teal-400 transition"
              >
                Start Draft
              </button>

              <div className="rounded-2xl border border-slate-700 bg-slate-900/80 px-6 py-4 text-left">
                <p className="text-xs text-slate-400 font-bold uppercase">
                  Challenge
                </p>
                <p className="text-lg font-black">
                  Can you go 38 games unbeaten?
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl shadow-black/40">
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="rounded-2xl bg-slate-950 border border-slate-800 p-5">
                <p className="text-teal-400 text-sm font-black mb-1">01</p>
                <h3 className="font-black text-xl">Draft</h3>
                <p className="text-sm text-slate-400 mt-2">
                  Choose players position by position.
                </p>
              </div>

              <div className="rounded-2xl bg-slate-950 border border-slate-800 p-5">
                <p className="text-yellow-400 text-sm font-black mb-1">02</p>
                <h3 className="font-black text-xl">Chemistry</h3>
                <p className="text-sm text-slate-400 mt-2">
                  Link clubs, nations and leagues.
                </p>
              </div>

              <div className="rounded-2xl bg-slate-950 border border-slate-800 p-5">
                <p className="text-green-400 text-sm font-black mb-1">03</p>
                <h3 className="font-black text-xl">Simulate</h3>
                <p className="text-sm text-slate-400 mt-2">
                  Watch a full 38-game season unfold.
                </p>
              </div>

              <div className="rounded-2xl bg-slate-950 border border-slate-800 p-5">
                <p className="text-red-400 text-sm font-black mb-1">04</p>
                <h3 className="font-black text-xl">Share</h3>
                <p className="text-sm text-slate-400 mt-2">
                  Copy your final season result.
                </p>
              </div>
            </div>

            <div className="rounded-3xl border border-teal-400 bg-teal-500/10 p-5">
              <p className="text-sm font-black text-teal-400 mb-2">
                SEASON TARGET
              </p>

              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-4xl font-black">38-0</p>
                  <p className="text-sm text-slate-400 mt-1">
                    The perfect unbeaten season.
                  </p>
                </div>

                <div className="rounded-2xl bg-slate-950 border border-slate-800 px-5 py-4 text-center">
                  <p className="text-xs text-slate-500 font-bold">MODE</p>
                  <p className="text-xl font-black">Draft</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <p className="absolute bottom-5 text-xs text-slate-600">
          UnbeatenXI Beta • Free football draft simulator
        </p>
      </div>
    </div>
  );
}

export default HomeScreen;