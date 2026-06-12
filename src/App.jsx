import { useState } from "react";

function App() {
  const [screen, setScreen] = useState("home");
  const [formation, setFormation] = useState("");

  const formations = ["4-3-3", "4-4-2", "4-2-3-1", "3-5-2"];

  if (screen === "formation") {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-6">
        <div className="max-w-3xl w-full text-center">
          <p className="text-teal-400 font-bold tracking-[4px] mb-4">
            ULTIMATE 38
          </p>

          <h1 className="text-4xl md:text-6xl font-black mb-4">
            Choose Your Formation
          </h1>

          <p className="text-slate-300 mb-10">
            Pick the shape for your Ultimate XI.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {formations.map((item) => (
              <button
                key={item}
                onClick={() => setFormation(item)}
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
            <button className="mt-10 rounded-xl bg-teal-500 px-8 py-4 font-bold text-white hover:bg-teal-400">
              Continue
            </button>
          )}

          <button
            onClick={() => setScreen("home")}
            className="mt-6 block mx-auto text-slate-400 hover:text-white"
          >
            Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-gray-900 text-white flex items-center justify-center text-center p-6">
      <div className="max-w-3xl">
        <p className="text-teal-400 font-bold tracking-[4px] mb-4">
          FOOTBALL DRAFT SIMULATOR
        </p>

        <h1 className="text-6xl md:text-8xl font-black tracking-tight mb-6">
          ULTIMATE 38
        </h1>

        <p className="text-xl md:text-2xl text-slate-300 mb-10">
          Build The Greatest XI Of The Modern Era
        </p>

        <button
          onClick={() => setScreen("formation")}
          className="rounded-xl bg-teal-500 px-10 py-5 text-lg font-bold text-white shadow-2xl shadow-teal-500/20 hover:bg-teal-400"
        >
          Start Draft
        </button>
      </div>
    </div>
  );
}

export default App;