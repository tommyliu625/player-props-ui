import moment from 'moment';

export function findAvgStats(playerStats, numGames, setActualGames, setPlayerStats) {
  let start = 0;
  if (playerStats[0].id === 'Avg') start = 1;
  let numPlayedGames = playerStats.filter((info) => {
    let { id, pts, rbs, asts, fg3m, blks, stls, tos } = info;
    return (
      id !== 'Avg' &&
      (pts !== 0 ||
        rbs !== 0 ||
        asts !== 0 ||
        fg3m !== 0 ||
        blks !== 0 ||
        stls !== 0 ||
        tos !== 0)
    );
  }).length;
  let avgGame = numGames < numPlayedGames ? numGames : numPlayedGames;
  setActualGames(avgGame);
  const { position, full_name } = playerStats[0];
  const avgRecord = {
    id: 'Avg',
    date: 'NA',
    first_name: 'Average',
    last_name: `Last ${numGames < avgGame ? numGames : avgGame} games`,
    position,
    full_name,
    pts: 0,
    rbs: 0,
    asts: 0,
    fgm: 0,
    fga: 0,
    fg3m: 0,
    fg3a: 0,
    ftm: 0,
    fta: 0,
    blks: 0,
    stls: 0,
    tos: 0,
    opposing_team_full_name: 'NA',
    postseason: 'NA',
  };
  let count = 0;

  for (let i = start; i < playerStats.length + start; i++) {
    const { pts, rbs, asts, fgm, fga, fg3m, fg3a, ftm, fta, blks, stls, tos } = playerStats[i];
    if (
      pts !== 0 ||
      rbs !== 0 ||
      asts !== 0 ||
      fg3m !== 0 ||
      blks !== 0 ||
      stls !== 0 ||
      tos !== 0
    ) {
      avgRecord.pts += pts / avgGame;
      avgRecord.rbs += rbs / avgGame;
      avgRecord.asts += asts / avgGame;
      avgRecord.fgm += fgm / avgGame;
      avgRecord.fga += fga / avgGame;
      avgRecord.fg3m += fg3m / avgGame;
      avgRecord.fg3a += fg3a / avgGame;
      avgRecord.ftm += ftm / avgGame;
      avgRecord.fta += fta / avgGame;
      avgRecord.blks += blks / avgGame;
      avgRecord.stls += stls / avgGame;
      avgRecord.tos += tos / avgGame;
      count += 1;
    }
    if (count === avgGame) {
      avgRecord.pts = avgRecord.pts.toFixed(2);
      avgRecord.rbs = avgRecord.rbs.toFixed(2);
      avgRecord.asts = avgRecord.asts.toFixed(2);
      avgRecord.fgm = avgRecord.fgm.toFixed(2);
      avgRecord.fga = avgRecord.fga.toFixed(2);
      avgRecord.fg3m = avgRecord.fg3m.toFixed(2);
      avgRecord.fg3a = avgRecord.fg3a.toFixed(2);
      avgRecord.ftm = avgRecord.ftm.toFixed(2);
      avgRecord.fta = avgRecord.fta.toFixed(2);
      avgRecord.blks = avgRecord.blks.toFixed(2);
      avgRecord.stls = avgRecord.stls.toFixed(2);
      avgRecord.tos = avgRecord.tos.toFixed(2);
      break;
    }
  }
  if (playerStats[0].id !== 'Avg') {
    setPlayerStats((stats) => [avgRecord, ...stats]);
  } else {
    setPlayerStats((stats) => [avgRecord, ...stats.slice(1, avgRecord.length)]);
  }
}

export function findAvgStatsForGames(
  gameStats,
  numGames,
  setActualGames,
  setGameStats,
  selectedTeam
) {
  let start = 0;
  if (gameStats[0].id === 'Avg') start = 1;
  let actualGames = numGames > gameStats.length - start ? gameStats.length - start : numGames
  setActualGames(actualGames);

  const avgRecord = {
    id: 'Avg',
    game_id: 'Avg',
    date: 'Average',
    ht_full_name: selectedTeam.full_name,
    ht_score: 'Last',
    at_full_name: `${numGames} Games Average`,
    at_score: 0,
    postseason: 'NA',
    season: 'NA',
  };
  let count = 0;

  for (let i = start; i < actualGames + start; i++) {
    const { game_id, date, ht_id, ht_abbreviation, ht_city, ht_conference, ht_division, ht_full_name, ht_score, at_id, at_abbreviation, at_city, at_conference, at_division, at_full_name, at_score, postseason, season } = gameStats[i];
    if (ht_full_name === selectedTeam.full_name) {
      avgRecord.at_score += (ht_score / actualGames);
    } else {
      avgRecord.at_score += at_score / actualGames;
    }
    count += 1;
    if (count === actualGames) {
      avgRecord.at_score = avgRecord.at_score.toFixed(2);
      break;
    };
  }
  if (gameStats[0].id !== 'Avg') {
    setGameStats((stats) => [avgRecord, ...stats]);
  } else {
    setGameStats((stats) => [avgRecord, ...stats.slice(1, avgRecord.length)]);
  }
}

export function dateString(momentDate) {
  return moment(momentDate).format('YYYY-MM-DD');
}
