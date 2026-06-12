const USER_TEAM_NAME = "UnbeatenXI";

function randomItem(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function clamp(number, min, max) {
  return Math.max(min, Math.min(max, number));
}

function getPlayerName(player) {
  return player?.name || "Unknown Player";
}

function getChemistryBoost(chemistryRating = 0) {
  if (chemistryRating >= 80) return 3;
  if (chemistryRating >= 60) return 1;
  if (chemistryRating >= 40) return 0;
  if (chemistryRating >= 20) return -1;
  return -3;
}

function pickGoalScorer(outfieldPlayers) {
  const attackers = outfieldPlayers.filter((player) =>
    ["ST", "LW", "RW", "CAM"].includes(player.position)
  );

  const midfielders = outfieldPlayers.filter((player) =>
    ["CM", "LM", "RM", "CDM"].includes(player.position)
  );

  const defenders = outfieldPlayers.filter((player) =>
    ["LB", "CB", "RB", "LWB", "RWB"].includes(player.position)
  );

  const weightedPool = [
    ...attackers,
    ...attackers,
    ...attackers,
    ...attackers,
    ...midfielders,
    ...midfielders,
    ...defenders,
  ];

  return randomItem(weightedPool.length ? weightedPool : outfieldPlayers);
}

function pickAssistProvider(outfieldPlayers, scorer) {
  const availablePlayers = outfieldPlayers.filter(
    (player) => player.id !== scorer.id
  );

  return randomItem(availablePlayers.length ? availablePlayers : outfieldPlayers);
}

function generateGoals(
  teamRating,
  opponentRating,
  attackBonus = 0,
  defencePenalty = 0
) {
  const ratingDifference = teamRating - opponentRating;

  let expectedGoals =
    1.35 +
    ratingDifference / 12 +
    attackBonus -
    defencePenalty +
    Math.random() * 1.1;

  expectedGoals = clamp(expectedGoals, 0, 4.5);

  let goals = Math.round(expectedGoals);

  if (Math.random() < 0.08) goals = 0;
  if (Math.random() < 0.1) goals += 1;

  return clamp(goals, 0, 6);
}

function getOpponentSeasonPoints(overall) {
  const basePoints = 38 + (overall - 78) * 2.2;
  const randomSwing = Math.round(Math.random() * 18 - 9);

  return clamp(Math.round(basePoints + randomSwing), 25, 88);
}

function buildOpponentRecord(points) {
  let wins = Math.floor(points / 3);
  let remainingPoints = points - wins * 3;
  let draws = remainingPoints;
  let losses = 38 - wins - draws;

  while (losses < 0) {
    wins -= 1;
    draws += 3;
    losses = 38 - wins - draws;
  }

  return { wins, draws, losses };
}

export function simulateSeason(userTeam, clubs, draftedPlayers) {
  const chemistryBoost = getChemistryBoost(userTeam.chemistryRating);

  const balancedUserRating =
    userTeam.overallRating +
    chemistryBoost +
    (userTeam.attackRating - 80) * 0.08 +
    (userTeam.midfieldRating - 80) * 0.05 +
    (userTeam.defenceRating - 80) * 0.06 +
    (userTeam.goalkeeperRating - 80) * 0.04;

  const adjustedUserRating = Math.round(balancedUserRating);

  const shuffledClubs = [...clubs].sort(() => Math.random() - 0.5);
  const opponents = shuffledClubs.slice(0, 19);

  const squad = Object.values(draftedPlayers);
  const outfieldPlayers = squad.filter((player) => player.position !== "GK");
  const goalkeeper = squad.find((player) => player.position === "GK");

  const playerStats = squad.map((player) => ({
    id: player.id,
    name: player.name,
    position: player.position,
    club: player.club,
    goals: 0,
    assists: 0,
    cleanSheets: 0,
    rating: player.rating,
  }));

  const fixtures = [];

  const tableTeams = [
    {
      club: USER_TEAM_NAME,
      overall: adjustedUserRating,
      baseOverall: userTeam.overallRating,
      chemistryRating: userTeam.chemistryRating,
      chemistryBoost,
      played: 0,
      wins: 0,
      draws: 0,
      losses: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      goalDifference: 0,
      points: 0,
    },
    ...opponents.map((club) => ({
      club: club.club,
      overall: club.overall,
      played: 0,
      wins: 0,
      draws: 0,
      losses: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      goalDifference: 0,
      points: 0,
    })),
  ];

  const userTableTeam = tableTeams[0];
  const opponentList = [...opponents, ...opponents];

  opponentList.forEach((opponent, index) => {
    const isHome = index % 2 === 0;
    const homeAdvantage = isHome ? 1.5 : -0.75;

    const userAttackBonus = (userTeam.attackRating - 80) / 22;
    const opponentAttackBonus = (opponent.overall - 80) / 28;

    const userDefencePenalty = (opponent.overall - userTeam.defenceRating) / 35;
    const opponentDefencePenalty =
      (userTeam.attackRating - opponent.overall) / 35;

    const userGoals = generateGoals(
      adjustedUserRating + homeAdvantage,
      opponent.overall,
      userAttackBonus,
      userDefencePenalty
    );

    const opponentGoals = generateGoals(
      opponent.overall,
      adjustedUserRating + homeAdvantage,
      opponentAttackBonus,
      opponentDefencePenalty
    );

    const goalEvents = [];

    for (let i = 0; i < userGoals; i++) {
      const scorer = pickGoalScorer(outfieldPlayers);
      const assister = pickAssistProvider(outfieldPlayers, scorer);

      goalEvents.push({
        team: USER_TEAM_NAME,
        scorer: getPlayerName(scorer),
        assist: getPlayerName(assister),
      });

      const scorerStats = playerStats.find((player) => player.id === scorer.id);
      const assisterStats = playerStats.find(
        (player) => player.id === assister.id
      );

      if (scorerStats) scorerStats.goals += 1;
      if (assisterStats) assisterStats.assists += 1;
    }

    if (opponentGoals === 0 && goalkeeper) {
      const goalkeeperStats = playerStats.find(
        (player) => player.id === goalkeeper.id
      );

      if (goalkeeperStats) goalkeeperStats.cleanSheets += 1;
    }

    let result = "draw";

    if (userGoals > opponentGoals) result = "win";
    if (userGoals < opponentGoals) result = "loss";

    userTableTeam.played += 1;
    userTableTeam.goalsFor += userGoals;
    userTableTeam.goalsAgainst += opponentGoals;

    if (result === "win") {
      userTableTeam.wins += 1;
      userTableTeam.points += 3;
    } else if (result === "draw") {
      userTableTeam.draws += 1;
      userTableTeam.points += 1;
    } else {
      userTableTeam.losses += 1;
    }

    const opponentTeam = tableTeams.find((team) => team.club === opponent.club);

    opponentTeam.played += 1;
    opponentTeam.goalsFor += opponentGoals;
    opponentTeam.goalsAgainst += userGoals;

    if (result === "loss") {
      opponentTeam.wins += 1;
      opponentTeam.points += 3;
    } else if (result === "draw") {
      opponentTeam.draws += 1;
      opponentTeam.points += 1;
    } else {
      opponentTeam.losses += 1;
    }

    fixtures.push({
      matchNumber: index + 1,
      opponent: opponent.club,
      homeAway: isHome ? "Home" : "Away",
      userGoals,
      opponentGoals,
      result,
      goalEvents,
    });
  });

  tableTeams.forEach((team) => {
    if (team.club !== USER_TEAM_NAME) {
      const targetPoints = getOpponentSeasonPoints(team.overall);
      const remainingPoints = Math.max(0, targetPoints - team.points);
      const record = buildOpponentRecord(remainingPoints);

      team.wins += record.wins;
      team.draws += record.draws;
      team.losses += record.losses;
      team.points += record.wins * 3 + record.draws;
      team.played = 38;

      const goalQuality = team.overall - 75;
      team.goalsFor += Math.round(35 + goalQuality * 1.4 + Math.random() * 18);
      team.goalsAgainst += Math.round(
        65 - goalQuality * 1.1 + Math.random() * 18
      );
    }

    team.goalDifference = team.goalsFor - team.goalsAgainst;
  });

  const table = tableTeams
    .sort((a, b) => {
      if (b.points !== a.points) return b.points - a.points;

      if (b.goalDifference !== a.goalDifference) {
        return b.goalDifference - a.goalDifference;
      }

      return b.goalsFor - a.goalsFor;
    })
    .map((team, index) => ({
      ...team,
      position: index + 1,
    }));

  const topScorer = [...playerStats].sort((a, b) => b.goals - a.goals)[0];
  const topAssister = [...playerStats].sort((a, b) => b.assists - a.assists)[0];

  const cleanSheetLeader = [...playerStats].sort(
    (a, b) => b.cleanSheets - a.cleanSheets
  )[0];

  return {
    fixtures,
    table,
    playerStats,
    topScorer,
    topAssister,
    cleanSheetLeader,
    chemistryBoost,
    adjustedUserRating,
  };
}