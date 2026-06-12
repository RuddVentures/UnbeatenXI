export function calculateAverage(list) {
  if (list.length === 0) return 0;
  return Math.round(list.reduce((sum, player) => sum + player.rating, 0) / list.length);
}

export function calculateChemistry(draftedPlayers) {
  const players = Object.values(draftedPlayers);

  if (players.length < 2) return 0;

  let chemistryPoints = 0;

  for (let i = 0; i < players.length; i++) {
    for (let j = i + 1; j < players.length; j++) {
      const playerA = players[i];
      const playerB = players[j];

      if (playerA.club === playerB.club) {
        chemistryPoints += 6;
      } else if (playerA.nation === playerB.nation) {
        chemistryPoints += 4;
      } else if (playerA.league === playerB.league) {
        chemistryPoints += 2;
      }
    }
  }

  return Math.min(100, chemistryPoints);
}

export function calculateTeamRatings(formation, formationPositions, draftedPlayers) {
  const positions = formationPositions[formation];

  const draftedList = positions.map((position, index) => ({
    position,
    player: draftedPlayers[index],
  }));

  const goalkeeper = draftedList
    .filter((item) => item.position === "GK")
    .map((item) => item.player);

  const defence = draftedList
    .filter((item) => ["LB", "CB", "RB", "LWB", "RWB"].includes(item.position))
    .map((item) => item.player);

  const midfield = draftedList
    .filter((item) => ["CDM", "CM", "CAM", "LM", "RM"].includes(item.position))
    .map((item) => item.player);

  const attack = draftedList
    .filter((item) => ["LW", "RW", "ST"].includes(item.position))
    .map((item) => item.player);

  const all = Object.values(draftedPlayers);
  const chemistryRating = calculateChemistry(draftedPlayers);

  return {
    overallRating: calculateAverage(all),
    attackRating: calculateAverage(attack),
    midfieldRating: calculateAverage(midfield),
    defenceRating: calculateAverage(defence),
    goalkeeperRating: calculateAverage(goalkeeper),
    chemistryRating,
  };
}