function HomeScreen({ onStartDraft }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-gray-900 text-white flex items-center justify-center text-center p-6">
      <div className="max-w-3xl">
        <p className="text-teal-400 font-bold tracking-[4px] mb-4">FOOTBALL DRAFT SIMULATOR</p>
        <h1 className="text-6xl md:text-8xl font-black tracking-tight mb-6">ULTIMATE 38</h1>
        <p className="text-xl md:text-2xl text-slate-300 mb-10">Build The Greatest XI Of The Modern Era</p>
        <button onClick={onStartDraft} className="rounded-xl bg-teal-500 px-10 py-5 text-lg font-bold text-white shadow-2xl shadow-teal-500/20 hover:bg-teal-400">
          Start Draft
        </button>
      </div>
    </div>
  );
}

export default HomeScreen;