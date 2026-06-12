export function getAchievements(seasonData, userTeam) {
  if (!seasonData || !userTeam) return [];

  const bestDefence = Math.min(...seasonData.table.map((team) => team.goalsAgainst));
  const achievements = [];

  if (userTeam.position === 1) achievements.push("Champions");
  if (userTeam.position <= 4) achievements.push("Top 4 Finish");
  if (userTeam.losses === 0) achievements.push("Invincible");
  if (userTeam.points >= 100) achievements.push("100+ Points");
  if (userTeam.goalsFor >= 100) achievements.push("100+ Goals");
  if (userTeam.goalsAgainst === bestDefence) achievements.push("Best Defence");
  if (userTeam.position >= 17) achievements.push("Relegation Escape");

  if (achievements.length === 0) achievements.push("Season Completed");

  return achievements;
}