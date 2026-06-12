export const squadRules = {
  maxPerClub: 2,
  maxEliteOrTop: 5,
};

export function getDraftRuleCounts(draftedPlayers) {
  const selectedPlayers = Object.values(draftedPlayers);

  const clubCounts = {};
  let eliteOrTopCount = 0;

  selectedPlayers.forEach((player) => {
    clubCounts[player.club] = (clubCounts[player.club] || 0) + 1;

    if (player.tier === "elite" || player.tier === "top") {
      eliteOrTopCount += 1;
    }
  });

  return {
    clubCounts,
    eliteOrTopCount,
  };
}

export function canDraftPlayer(player, draftedPlayers) {
  const counts = getDraftRuleCounts(draftedPlayers);
  const currentClubCount = counts.clubCounts[player.club] || 0;

  if (currentClubCount >= squadRules.maxPerClub) return false;

  if (
    (player.tier === "elite" || player.tier === "top") &&
    counts.eliteOrTopCount >= squadRules.maxEliteOrTop
  ) {
    return false;
  }

  return true;
}