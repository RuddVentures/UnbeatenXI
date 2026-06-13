import { useEffect, useState } from "react";
import { players } from "./data/players";
import { additionalPlayers } from "./data/additionalPlayers";
import { extraPlayers } from "./data/extraPlayers";
import { clubs } from "./data/clubs";
import { simulateSeason } from "./utils/simulation";
import { calculateTeamRatings } from "./utils/teamRatings";
import { getAchievements } from "./utils/achievements";
import { canDraftPlayer } from "./utils/draftRules";
import { formations, formationPositions } from "./constants/formations";
import HomeScreen from "./components/HomeScreen";
import SetupScreen from "./components/SetupScreen";
import FormationScreen from "./components/FormationScreen";
import DraftScreen from "./components/DraftScreen";
import RatingScreen from "./components/RatingScreen";
import LiveResultsScreen from "./components/LiveResultsScreen";
import ResultsScreen from "./components/ResultsScreen";

const fullPlayerPool = [...players, ...additionalPlayers, ...extraPlayers];

function App() {
  const [screen, setScreen] = useState("home");
  const [formation, setFormation] = useState("");
  const [difficulty, setDifficulty] = useState("medium");
  const [hideRatings, setHideRatings] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [draftedPlayers, setDraftedPlayers] = useState({});
  const [draftOptionsBySlot, setDraftOptionsBySlot] = useState({});
  const [seasonData, setSeasonData] = useState(null);
  const [currentFixtureIndex, setCurrentFixtureIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  const draftOptions =
    selectedSlot !== null ? draftOptionsBySlot[selectedSlot] || [] : [];

  useEffect(() => {
    if (screen !== "liveResults" || !seasonData) return;

    const timer = setTimeout(() => {
      if (currentFixtureIndex < seasonData.fixtures.length - 1) {
        setCurrentFixtureIndex((current) => current + 1);
      } else {
        setScreen("results");
      }
    }, 1600);

    return () => clearTimeout(timer);
  }, [screen, currentFixtureIndex, seasonData]);

  function startNewDraft() {
    setFormation("");
    setSelectedSlot(null);
    setDraftedPlayers({});
    setDraftOptionsBySlot({});
    setSeasonData(null);
    setCurrentFixtureIndex(0);
    setCopied(false);
    setScreen("setup");
  }

  function shuffleList(list) {
    return [...list].sort(() => Math.random() - 0.5);
  }

  function getDraftTierPlan() {
    const plans = {
      easy: ["eliteTop", "eliteTop", "good", "good", "rotation", "weak"],
      medium: ["eliteTop", "good", "good", "rotation", "rotation", "weak"],
      hard: ["eliteTop", "good", "rotation", "rotation", "weak", "weak"],
    };

    return plans[difficulty] || plans.medium;
  }

  function playerMatchesTierGroup(player, tierGroup) {
    if (tierGroup === "eliteTop") {
      return player.tier === "elite" || player.tier === "top";
    }

    return player.tier === tierGroup;
  }

  function getFallbackWeight(player) {
    const weights = {
      easy: { elite: 7, top: 6, good: 4, rotation: 2, weak: 1 },
      medium: { elite: 3, top: 4, good: 5, rotation: 4, weak: 2 },
      hard: { elite: 1, top: 2, good: 4, rotation: 5, weak: 4 },
    };

    return weights[difficulty]?.[player.tier] || 1;
  }

  function pickRandomPlayer(pool, alreadySelected) {
    const available = pool.filter(
      (player) => !alreadySelected.some((selected) => selected.id === player.id)
    );

    if (available.length === 0) return null;

    return available[Math.floor(Math.random() * available.length)];
  }

  function getFallbackPlayers(pool, selected, count) {
    const weightedPool = [];

    pool.forEach((player) => {
      if (selected.some((selectedPlayer) => selectedPlayer.id === player.id)) {
        return;
      }

      const weight = getFallbackWeight(player);

      for (let i = 0; i < weight; i++) {
        weightedPool.push(player);
      }
    });

    const fallbackSelected = [...selected];

    while (fallbackSelected.length < count && weightedPool.length > 0) {
      const randomPlayer =
        weightedPool[Math.floor(Math.random() * weightedPool.length)];

      if (!fallbackSelected.some((player) => player.id === randomPlayer.id)) {
        fallbackSelected.push(randomPlayer);
      }

      for (let i = weightedPool.length - 1; i >= 0; i--) {
        if (weightedPool[i].id === randomPlayer.id) {
          weightedPool.splice(i, 1);
        }
      }
    }

    return fallbackSelected;
  }

  function getRandomPlayers(position, count = 6) {
    const usedIds = Object.values(draftedPlayers).map((player) => player.id);

    const positionPlayers = fullPlayerPool.filter(
      (player) => player.position === position && !usedIds.includes(player.id)
    );

    const validPlayers = positionPlayers.filter((player) =>
      canDraftPlayer(player, draftedPlayers)
    );

    const availablePlayers =
      validPlayers.length > 0 ? validPlayers : positionPlayers;

    const tierPlan = getDraftTierPlan();
    const selected = [];

    tierPlan.forEach((tierGroup) => {
      const tierPool = shuffleList(
        availablePlayers.filter((player) =>
          playerMatchesTierGroup(player, tierGroup)
        )
      );

      const selectedPlayer = pickRandomPlayer(tierPool, selected);

      if (selectedPlayer) {
        selected.push(selectedPlayer);
      }
    });

    const completedSelection = getFallbackPlayers(
      availablePlayers,
      selected,
      count
    );

    return completedSelection.slice(0, count);
  }

  function openDraftOptions(slotIndex) {
    if (draftedPlayers[slotIndex]) return;

    setSelectedSlot(slotIndex);

    if (draftOptionsBySlot[slotIndex]) {
      return;
    }

    const position = formationPositions[formation][slotIndex];
    const generatedOptions = getRandomPlayers(position, 6);

    setDraftOptionsBySlot((currentOptions) => ({
      ...currentOptions,
      [slotIndex]: generatedOptions,
    }));
  }

  function choosePlayer(player) {
    if (selectedSlot === null) return;
    if (draftedPlayers[selectedSlot]) return;

    if (!canDraftPlayer(player, draftedPlayers)) {
      return;
    }

    setDraftedPlayers({
      ...draftedPlayers,
      [selectedSlot]: player,
    });

    setSelectedSlot(null);
  }

  function getCurrentTeamRatings() {
    return calculateTeamRatings(formation, formationPositions, draftedPlayers);
  }

  function runSimulation() {
    const ratings = getCurrentTeamRatings();
    const result = simulateSeason(ratings, clubs, draftedPlayers, difficulty);

    setSeasonData(result);
    setCurrentFixtureIndex(0);
    setCopied(false);
    setScreen("liveResults");
  }

  function skipToFinalTable() {
    setScreen("results");
  }

  function getPositionSuffix(position) {
    if (position === 1) return "st";
    if (position === 2) return "nd";
    if (position === 3) return "rd";
    return "th";
  }

  function copyResult(userTeam) {
    const achievements = getAchievements(seasonData, userTeam).join(", ");

    const text = `UNBEATEN XI

I finished ${userTeam.position}${getPositionSuffix(
      userTeam.position
    )} with ${userTeam.points} points on UnbeatenXI.

Difficulty: ${difficulty.toUpperCase()}
Record: ${userTeam.wins}W ${userTeam.draws}D ${userTeam.losses}L
Goals For: ${userTeam.goalsFor}
Goals Against: ${userTeam.goalsAgainst}
Goal Difference: ${userTeam.goalDifference}

Top Scorer: ${seasonData.topScorer.name} (${seasonData.topScorer.goals})
Top Assists: ${seasonData.topAssister.name} (${seasonData.topAssister.assists})
Achievements: ${achievements || "None"}

Can your XI beat mine?`;

    navigator.clipboard.writeText(text);
    setCopied(true);
  }

  if (screen === "setup") {
    return (
      <SetupScreen
        difficulty={difficulty}
        hideRatings={hideRatings}
        onDifficultyChange={setDifficulty}
        onToggleHideRatings={() => setHideRatings(!hideRatings)}
        onContinue={() => setScreen("formation")}
      />
    );
  }

  if (screen === "formation") {
    return (
      <FormationScreen
        formations={formations}
        formation={formation}
        onSelectFormation={setFormation}
        onContinue={() => setScreen("draft")}
      />
    );
  }

  if (screen === "draft") {
    return (
      <DraftScreen
        formation={formation}
        difficulty={difficulty}
        hideRatings={hideRatings}
        positions={formationPositions[formation]}
        selectedSlot={selectedSlot}
        draftedPlayers={draftedPlayers}
        draftOptions={draftOptions}
        onOpenDraftOptions={openDraftOptions}
        onChoosePlayer={choosePlayer}
        onContinue={() => setScreen("rating")}
      />
    );
  }

  if (screen === "rating") {
    return (
      <RatingScreen
        ratings={getCurrentTeamRatings()}
        onRunSimulation={runSimulation}
      />
    );
  }

  if (screen === "liveResults") {
    const fixture = seasonData.fixtures[currentFixtureIndex];

    return (
      <LiveResultsScreen
        fixture={fixture}
        onSkipToFinalTable={skipToFinalTable}
      />
    );
  }

  if (screen === "results") {
    const userTeam = seasonData.table.find(
      (team) =>
        team.club === "UnbeatenXI" ||
        team.club === "Your UnbeatenXI" ||
        team.club === "Your Ultimate XI"
    );

    const achievements = getAchievements(seasonData, userTeam);

    return (
      <ResultsScreen
        seasonData={seasonData}
        userTeam={userTeam}
        achievements={achievements}
        copied={copied}
        onCopyResult={copyResult}
        onStartNewDraft={startNewDraft}
      />
    );
  }

  return <HomeScreen onStartDraft={startNewDraft} />;
}

export default App;