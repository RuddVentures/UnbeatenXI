import {
  getDraftRuleCounts,
  squadRules,
  canDraftPlayer,
} from "../utils/draftRules";
import { calculateChemistry } from "../utils/teamRatings";

function DraftScreen({
  formation,
  difficulty,
  hideRatings,
  positions,
  selectedSlot,
  draftedPlayers,
  draftOptions,
  onOpenDraftOptions,
  onChoosePlayer,
  onContinue,
}) {
  const isDraftComplete = Object.keys(draftedPlayers).length === 11;
  const ruleCounts = getDraftRuleCounts(draftedPlayers);
  const liveChemistry = calculateChemistry(draftedPlayers);
  const selectedPosition = selectedSlot !== null ? positions[selectedSlot] : null;

  function DraftOptionsList({ mobile = false }) {
    if (selectedSlot === null) {
      return (
        <div className="rounded-2xl border border-dashed border-slate-700 p-5 text-center text-sm text-slate-400">
          Choose a position from your team to reveal player options.
        </div>
      );
    }

    return (
      <div>
        {mobile && (
          <div className="mb-3 rounded-2xl border border-teal-400 bg-teal-500/10 p-3">
            <p className="text-xs font-black uppercase tracking-[2px] text-teal-400">
              Pick your {selectedPosition}
            </p>
            <p className="text-sm text-slate-300">
              Select one player below. Once picked, the slot is locked.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {draftOptions.map((player) => {
            const eligible = canDraftPlayer(player, draftedPlayers);

            return (
              <button
                key={player.id}
                disabled={!eligible}
                onClick={() => onChoosePlayer(player)}
                className={`rounded-2xl border p-4 text-left transition ${
                  eligible
                    ? "border-slate-700 bg-slate-950 hover:border-teal-400 hover:bg-slate-800"
                    : "border-red-800 bg-red-950 opacity-50 cursor-not-allowed"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-lg font-black leading-tight">
                      {player.name}
                    </p>

                    <p className="text-sm text-slate-400 mt-1">
                      {player.club}
                    </p>

                    {!eligible && (
                      <p className="mt-2 text-xs font-bold text-red-400">
                        Rule Limit Reached
                      </p>
                    )}
                  </div>

                  <div
                    className={`shrink-0 rounded-xl px-3 py-2 text-base font-black text-white ${
                      eligible ? "bg-teal-500" : "bg-red-700"
                    }`}
                  >
                    {hideRatings ? "?" : player.rating}
                  </div>
                </div>

                <div className="mt-3 flex flex-wrap gap-2 text-xs">
                  <span className="rounded-full bg-slate-800 px-3 py-1">
                    {player.position}
                  </span>

                  <span className="rounded-full bg-slate-800 px-3 py-1">
                    {player.nation}
                  </span>

                  <span className="rounded-full bg-slate-800 px-3 py-1">
                    {player.league}
                  </span>

                  <span className="rounded-full bg-slate-800 px-3 py-1 capitalize">
                    {player.tier}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white px-3 py-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-5 sm:mb-8">
          <p className="text-teal-400 font-bold tracking-[4px] mb-2">
            UNBEATEN XI
          </p>

          <h1 className="text-3xl sm:text-4xl md:text-6xl font-black">
            Build Your XI
          </h1>

          <p className="text-slate-300 mt-2 text-sm sm:text-base">
            Formation: <span className="font-bold text-white">{formation}</span>
            {" | "}
            Difficulty:{" "}
            <span className="font-bold text-white capitalize">
              {difficulty}
            </span>
          </p>
        </div>

        <div className="sticky top-0 z-30 -mx-3 mb-4 border-y border-slate-800 bg-slate-950/95 px-3 py-3 backdrop-blur lg:hidden">
          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className="rounded-xl border border-slate-800 bg-slate-900 p-2">
              <p className="text-slate-400">Picked</p>
              <p className="text-lg font-black">
                {Object.keys(draftedPlayers).length}/11
              </p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900 p-2">
              <p className="text-slate-400">Elite/Top</p>
              <p className="text-lg font-black">
                {ruleCounts.eliteOrTopCount}/{squadRules.maxEliteOrTop}
              </p>
            </div>

            <div className="rounded-xl border border-yellow-400 bg-slate-900 p-2">
              <p className="text-yellow-400">Chem</p>
              <p className="text-lg font-black">{liveChemistry}</p>
            </div>
          </div>
        </div>

        <div className="mb-5 rounded-3xl border border-slate-800 bg-slate-900 p-4 sm:p-5">
          <h2 className="text-lg sm:text-xl font-black">
            How UnbeatenXI Works
          </h2>

          <p className="text-sm text-slate-400 mt-1">
            Squad rules, chemistry links and season boosts.
          </p>

          <div className="mt-4 grid grid-cols-1 lg:grid-cols-3 gap-3">
            <div className="rounded-2xl bg-slate-950 border border-slate-800 p-4">
              <h3 className="font-black text-teal-400 mb-2">Squad Rules</h3>
              <p className="text-sm text-slate-300">
                Max {squadRules.maxPerClub} players from the same club.
              </p>
              <p className="text-sm text-slate-300">
                Max {squadRules.maxEliteOrTop} Elite / Top players.
              </p>
            </div>

            <div className="rounded-2xl bg-slate-950 border border-slate-800 p-4">
              <h3 className="font-black text-yellow-400 mb-2">
                Chemistry Links
              </h3>
              <p className="text-sm text-slate-300">Same Club = +6</p>
              <p className="text-sm text-slate-300">Same Nation = +4</p>
              <p className="text-sm text-slate-300">Same League = +2</p>
            </div>

            <div className="rounded-2xl bg-slate-950 border border-slate-800 p-4">
              <h3 className="font-black text-green-400 mb-2">
                Season Impact
              </h3>
              <p className="text-sm text-slate-300">
                80+ Chemistry gives a +3 boost.
              </p>
              <p className="text-sm text-slate-300">
                Poor chemistry can lower your rating.
              </p>
            </div>
          </div>

          <div className="mt-4 hidden sm:grid grid-cols-3 gap-3 text-sm">
            <div className="rounded-2xl bg-slate-950 border border-slate-800 p-4">
              <p className="text-slate-400">Club Limit</p>
              <p className="text-2xl font-black">{squadRules.maxPerClub}</p>
            </div>

            <div className="rounded-2xl bg-slate-950 border border-slate-800 p-4">
              <p className="text-slate-400">Elite / Top Players</p>
              <p className="text-2xl font-black">
                {ruleCounts.eliteOrTopCount}/{squadRules.maxEliteOrTop}
              </p>
            </div>

            <div className="rounded-2xl bg-slate-950 border border-yellow-400 p-4">
              <p className="text-yellow-400 font-bold">Live Chemistry</p>
              <p className="text-2xl font-black">{liveChemistry}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-start">
          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-4 sm:p-6">
            <h2 className="text-xl sm:text-2xl font-black mb-4">
              Your Team
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {positions.map((position, index) => {
                const player = draftedPlayers[index];
                const active = selectedSlot === index;

                return (
                  <div key={`${position}-${index}`} className="space-y-3">
                    <button
                      onClick={() => onOpenDraftOptions(index)}
                      disabled={!!player}
                      className={`w-full rounded-2xl border p-4 text-left transition ${
                        active
                          ? "border-teal-400 bg-teal-500/20"
                          : player
                          ? "border-slate-700 bg-slate-800"
                          : "border-slate-700 bg-slate-950 hover:border-teal-400"
                      }`}
                    >
                      <p className="text-sm font-bold text-teal-400">
                        {position}
                      </p>

                      {player ? (
                        <>
                          <p className="text-base sm:text-lg font-black mt-1 leading-tight">
                            {player.name}
                          </p>

                          <p className="text-sm text-slate-400">
                            {player.club}
                          </p>

                          <p className="text-xs text-slate-500 mt-1">
                            {player.nation} • {player.league} • {player.tier}
                          </p>
                        </>
                      ) : (
                        <>
                          <p className="text-base sm:text-lg font-black mt-1">
                            Select Player
                          </p>

                          <p className="text-sm text-slate-500">
                            Tap to draft
                          </p>
                        </>
                      )}
                    </button>

                    {active && (
                      <div className="lg:hidden">
                        <DraftOptionsList mobile />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {isDraftComplete && (
              <button
                onClick={onContinue}
                className="mt-6 w-full rounded-xl bg-teal-500 px-8 py-4 font-bold text-white hover:bg-teal-400"
              >
                Continue To Team Rating
              </button>
            )}
          </div>

          <div className="hidden lg:block rounded-3xl border border-slate-800 bg-slate-900 p-6 sticky top-6">
            <h2 className="text-2xl font-black mb-6">Draft Options</h2>
            <DraftOptionsList />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DraftScreen;