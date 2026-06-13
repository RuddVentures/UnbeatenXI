import {
  getDraftRuleCounts,
  squadRules,
  canDraftPlayer,
} from "../utils/draftRules";
import { calculateChemistry } from "../utils/teamRatings";

function getTierStyle(tier) {
  const styles = {
    elite: {
      label: "Elite",
      border: "border-yellow-300",
      bg: "bg-yellow-400/10",
      badge: "bg-yellow-400 text-slate-950",
      glow: "shadow-yellow-400/20",
      text: "text-yellow-300",
    },
    top: {
      label: "Top",
      border: "border-purple-400",
      bg: "bg-purple-500/10",
      badge: "bg-purple-500 text-white",
      glow: "shadow-purple-500/20",
      text: "text-purple-300",
    },
    good: {
      label: "Good",
      border: "border-blue-400",
      bg: "bg-blue-500/10",
      badge: "bg-blue-500 text-white",
      glow: "shadow-blue-500/20",
      text: "text-blue-300",
    },
    rotation: {
      label: "Rotation",
      border: "border-slate-400",
      bg: "bg-slate-500/10",
      badge: "bg-slate-400 text-slate-950",
      glow: "shadow-slate-500/20",
      text: "text-slate-300",
    },
    weak: {
      label: "Weak",
      border: "border-orange-500",
      bg: "bg-orange-500/10",
      badge: "bg-orange-500 text-white",
      glow: "shadow-orange-500/20",
      text: "text-orange-300",
    },
  };

  return styles[tier] || styles.rotation;
}

function getChemistryLabel(chemistry) {
  if (chemistry >= 80) return "Elite Chemistry";
  if (chemistry >= 60) return "Good Chemistry";
  if (chemistry >= 40) return "Balanced";
  if (chemistry >= 20) return "Low Chemistry";
  return "Poor Chemistry";
}

function getPitchLayout(formation) {
  const layouts = {
    "4-3-3": [[8, 9, 10], [5, 6, 7], [1, 2, 3, 4], [0]],
    "4-4-2": [[9, 10], [5, 6, 7, 8], [1, 2, 3, 4], [0]],
    "4-2-3-1": [[10], [8, 7, 9], [5, 6], [1, 2, 3, 4], [0]],
    "3-5-2": [[9, 10], [4, 5, 6, 7, 8], [1, 2, 3], [0]],
    "5-2-3": [[8, 9, 10], [6, 7], [1, 2, 3, 4, 5], [0]],
    "3-4-3": [[8, 9, 10], [4, 5, 6, 7], [1, 2, 3], [0]],
    "4-1-2-1-2": [[9, 10], [8], [6, 7], [5], [1, 2, 3, 4], [0]],
    "2-3-5": [[6, 7, 8, 9, 10], [3, 4, 5], [1, 2], [0]],
  };

  return layouts[formation] || null;
}

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
  const pickedCount = Object.keys(draftedPlayers).length;
  const ruleCounts = getDraftRuleCounts(draftedPlayers);
  const liveChemistry = calculateChemistry(draftedPlayers);
  const selectedPosition = selectedSlot !== null ? positions[selectedSlot] : null;
  const chemistryWidth = `${Math.min(100, Math.max(0, liveChemistry))}%`;
  const pitchLayout = getPitchLayout(formation);

  function DraftOptionsList({ mobile = false }) {
    if (selectedSlot === null) {
      return (
        <div className="rounded-[2rem] border border-dashed border-slate-700 bg-slate-950/70 p-6 text-center text-sm text-slate-400">
          <p className="text-lg font-black text-white mb-2">Choose a Position</p>
          Tap a position from your XI to reveal six locked draft options.
        </div>
      );
    }

    return (
      <div>
        {mobile && (
          <div className="mb-4 rounded-[1.5rem] border border-teal-400 bg-teal-500/10 p-4">
            <p className="text-xs font-black uppercase tracking-[3px] text-teal-300">
              Pick your {selectedPosition}
            </p>
            <p className="text-sm text-slate-300 mt-1">
              First reveal is locked. Choose carefully.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {draftOptions.map((player) => {
            const eligible = canDraftPlayer(player, draftedPlayers);
            const style = getTierStyle(player.tier);

            return (
              <button
                key={player.id}
                disabled={!eligible}
                onClick={() => onChoosePlayer(player)}
                className={`group relative overflow-hidden rounded-[1.6rem] border p-4 text-left transition shadow-xl ${
                  eligible
                    ? `${style.border} ${style.bg} ${style.glow} hover:-translate-y-1 hover:shadow-2xl`
                    : "border-red-800 bg-red-950/60 opacity-50 cursor-not-allowed"
                }`}
              >
                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/5 blur-2xl" />

                <div className="relative z-10">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="min-w-0">
                      <p
                        className={`text-xs font-black uppercase tracking-[2px] ${style.text}`}
                      >
                        {player.position}
                      </p>

                      <p className="text-xl font-black leading-tight mt-1">
                        {player.name}
                      </p>

                      <p className="text-sm text-slate-400 mt-1">
                        {player.club}
                      </p>

                      {!eligible && (
                        <p className="mt-2 text-xs font-black text-red-300">
                          Rule Limit Reached
                        </p>
                      )}
                    </div>

                    <div
                      className={`shrink-0 rounded-2xl px-4 py-3 text-2xl font-black ${
                        eligible ? style.badge : "bg-red-700 text-white"
                      }`}
                    >
                      {hideRatings ? "?" : player.rating}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 text-xs">
                    <span className="rounded-full bg-slate-950/80 border border-slate-700 px-3 py-1 font-bold">
                      {player.nation}
                    </span>

                    <span className="rounded-full bg-slate-950/80 border border-slate-700 px-3 py-1 font-bold">
                      {player.league}
                    </span>

                    <span
                      className={`rounded-full px-3 py-1 font-black capitalize ${style.badge}`}
                    >
                      {style.label}
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  function PlayerSlot({ slotIndex, compact = false }) {
    const position = positions[slotIndex];
    const player = draftedPlayers[slotIndex];
    const active = selectedSlot === slotIndex;
    const style = player ? getTierStyle(player.tier) : null;

    return (
      <button
        onClick={() => onOpenDraftOptions(slotIndex)}
        disabled={!!player}
        className={`relative overflow-hidden w-full rounded-[1.2rem] border text-left transition shadow-lg ${
          compact ? "p-2.5 sm:p-3" : "p-4"
        } ${
          active
            ? "border-teal-300 bg-teal-500/20 shadow-teal-500/20 scale-[1.02]"
            : player
            ? `${style.border} ${style.bg} ${style.glow}`
            : "border-teal-400/40 bg-slate-950/80 hover:border-teal-300 hover:bg-teal-500/10 hover:-translate-y-0.5"
        }`}
      >
        <div className="absolute -right-8 -top-8 h-20 w-20 rounded-full bg-white/5 blur-2xl" />

        <div className="relative z-10">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <p
                className={`text-[10px] sm:text-xs font-black uppercase tracking-[2px] ${
                  player ? style.text : "text-teal-300"
                }`}
              >
                {position}
              </p>

              {player ? (
                <>
                  <p className="text-xs sm:text-sm font-black mt-1 leading-tight truncate">
                    {player.name}
                  </p>

                  <p className="text-[10px] sm:text-xs text-slate-400 truncate">
                    {player.club}
                  </p>
                </>
              ) : (
                <>
                  <p className="text-xs sm:text-sm font-black mt-1">Select</p>
                  <p className="text-[10px] sm:text-xs text-slate-500">
                    Tap slot
                  </p>
                </>
              )}
            </div>

            {player && (
              <div
                className={`shrink-0 rounded-xl px-2 py-1 text-sm sm:text-base font-black ${style.badge}`}
              >
                {hideRatings ? "?" : player.rating}
              </div>
            )}
          </div>
        </div>
      </button>
    );
  }

  function PitchView() {
    return (
      <div className="relative overflow-hidden rounded-[2rem] border border-teal-400/30 bg-emerald-950/30 p-4 sm:p-6 min-h-[640px] shadow-inner">
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,_rgba(20,184,166,0.08)_0%,_rgba(20,184,166,0.02)_100%)]" />
        <div className="absolute inset-4 rounded-[1.5rem] border-2 border-teal-300/20" />
        <div className="absolute left-1/2 top-1/2 h-36 w-36 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-teal-300/20" />
        <div className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-teal-300/30" />
        <div className="absolute left-1/2 bottom-4 h-20 w-44 -translate-x-1/2 rounded-t-[2rem] border-2 border-b-0 border-teal-300/20" />
        <div className="absolute left-1/2 top-4 h-20 w-44 -translate-x-1/2 rounded-b-[2rem] border-2 border-t-0 border-teal-300/20" />
        <div className="absolute left-4 right-4 top-1/2 h-px bg-teal-300/20" />

        <div className="relative z-10 flex min-h-[600px] flex-col justify-between gap-4">
          {pitchLayout.map((row, rowIndex) => (
            <div
              key={`row-${rowIndex}`}
              className={`grid gap-3 ${
                row.length === 1
                  ? "grid-cols-1 max-w-[190px] mx-auto w-full"
                  : row.length === 2
                  ? "grid-cols-2 max-w-[460px] mx-auto w-full"
                  : row.length === 3
                  ? "grid-cols-3 max-w-[700px] mx-auto w-full"
                  : row.length === 4
                  ? "grid-cols-4 w-full"
                  : "grid-cols-5 w-full"
              }`}
            >
              {row.map((slotIndex) => (
                <PlayerSlot
                  key={`pitch-slot-${slotIndex}`}
                  slotIndex={slotIndex}
                  compact
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white relative overflow-hidden px-3 py-4 sm:p-6">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(20,184,166,0.2),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(250,204,21,0.1),_transparent_30%),linear-gradient(135deg,_#020617_0%,_#0f172a_60%,_#042f2e_100%)]" />
      <div className="absolute inset-0 opacity-[0.06] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:46px_46px]" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-5 sm:mb-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-teal-400/40 bg-teal-500/10 px-4 py-2 mb-4">
            <span className="h-2 w-2 rounded-full bg-teal-400" />
            <p className="text-xs font-black tracking-[3px] text-teal-300 uppercase">
              UnbeatenXI Draft
            </p>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black">
            Build Your XI
          </h1>

          <p className="text-slate-300 mt-3 text-sm sm:text-base">
            <span className="font-black text-white">{formation}</span>
            {" • "}
            <span className="font-black text-white capitalize">
              {difficulty}
            </span>
            {" difficulty"}
          </p>
        </div>

        <div className="sticky top-0 z-30 -mx-3 mb-4 border-y border-slate-800 bg-slate-950/95 px-3 py-3 backdrop-blur lg:hidden">
          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <MobileStat label="Picked" value={`${pickedCount}/11`} />
            <MobileStat
              label="Elite/Top"
              value={`${ruleCounts.eliteOrTopCount}/${squadRules.maxEliteOrTop}`}
            />
            <MobileStat label="Chem" value={liveChemistry} highlight />
          </div>
        </div>

        <div className="mb-6 rounded-[2rem] border border-slate-800 bg-slate-900/80 backdrop-blur p-4 sm:p-5 shadow-2xl shadow-black/30">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-5 items-center">
            <div>
              <h2 className="text-xl sm:text-2xl font-black">
                Draft Control Centre
              </h2>

              <p className="text-sm text-slate-400 mt-1">
                Build chemistry, obey squad rules and create a squad that can
                survive 38 games.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <InfoPanel title="Club Limit" value={squadRules.maxPerClub} text="Max per club" />
              <InfoPanel
                title="Elite / Top"
                value={`${ruleCounts.eliteOrTopCount}/${squadRules.maxEliteOrTop}`}
                text="Squad rule"
              />

              <div className="rounded-2xl border border-yellow-400 bg-yellow-400/10 p-4">
                <div className="flex items-center justify-between gap-3 mb-3">
                  <div>
                    <p className="text-xs text-yellow-300 font-black uppercase">
                      Chemistry
                    </p>
                    <p className="text-sm text-slate-400">
                      {getChemistryLabel(liveChemistry)}
                    </p>
                  </div>

                  <p className="text-3xl font-black text-yellow-300">
                    {liveChemistry}
                  </p>
                </div>

                <div className="h-2 rounded-full bg-slate-950 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-yellow-400 transition-all"
                    style={{ width: chemistryWidth }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 lg:grid-cols-3 gap-3">
            <RuleCard title="Same Club" value="+6 Chemistry" />
            <RuleCard title="Same Nation" value="+4 Chemistry" />
            <RuleCard title="Same League" value="+2 Chemistry" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-6 lg:gap-8 items-start">
          <div className="rounded-[2rem] border border-slate-800 bg-slate-900/80 backdrop-blur p-4 sm:p-6 shadow-2xl shadow-black/30">
            <div className="flex items-center justify-between gap-4 mb-5">
              <div>
                <p className="text-xs text-teal-300 font-black uppercase tracking-[3px]">
                  Formation Pitch
                </p>
                <h2 className="text-2xl sm:text-3xl font-black">
                  Your Team
                </h2>
              </div>

              <div className="rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-center">
                <p className="text-xs text-slate-500 font-black">PICKS</p>
                <p className="text-2xl font-black">{pickedCount}/11</p>
              </div>
            </div>

            <PitchView />

            {selectedSlot !== null && (
              <div className="mt-5 lg:hidden">
                <DraftOptionsList mobile />
              </div>
            )}

            {isDraftComplete && (
              <button
                onClick={onContinue}
                className="mt-6 w-full rounded-2xl bg-teal-500 px-8 py-5 font-black text-white shadow-2xl shadow-teal-500/25 hover:bg-teal-400 hover:-translate-y-1 transition"
              >
                Continue To Team Rating →
              </button>
            )}
          </div>

          <div className="hidden lg:block rounded-[2rem] border border-slate-800 bg-slate-900/80 backdrop-blur p-6 sticky top-6 shadow-2xl shadow-black/30">
            <div className="flex items-center justify-between gap-4 mb-6">
              <div>
                <p className="text-xs text-teal-300 font-black uppercase tracking-[3px]">
                  Locked Reveal
                </p>

                <h2 className="text-3xl font-black">Draft Options</h2>
              </div>

              <div className="rounded-2xl bg-slate-950 border border-slate-700 px-4 py-3 text-center">
                <p className="text-xs text-slate-500 font-black">PICK</p>
                <p className="text-xl font-black">
                  {selectedPosition || "--"}
                </p>
              </div>
            </div>

            <DraftOptionsList />
          </div>
        </div>
      </div>
    </div>
  );
}

function MobileStat({ label, value, highlight }) {
  return (
    <div
      className={`rounded-xl border p-2 ${
        highlight
          ? "border-yellow-400 bg-yellow-400/10"
          : "border-slate-800 bg-slate-900"
      }`}
    >
      <p className={highlight ? "text-yellow-300" : "text-slate-400"}>
        {label}
      </p>
      <p className="text-lg font-black">{value}</p>
    </div>
  );
}

function InfoPanel({ title, value, text }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
      <p className="text-xs text-slate-400 font-black uppercase">{title}</p>
      <p className="text-3xl font-black mt-1">{value}</p>
      <p className="text-xs text-slate-500 mt-1">{text}</p>
    </div>
  );
}

function RuleCard({ title, value }) {
  return (
    <div className="rounded-2xl bg-slate-950/80 border border-slate-800 p-4">
      <p className="font-black text-slate-200">{title}</p>
      <p className="text-sm text-teal-300 font-bold mt-1">{value}</p>
    </div>
  );
}

export default DraftScreen;