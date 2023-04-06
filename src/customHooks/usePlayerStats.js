import {useState, useEffect} from 'react';
import axios from 'axios';
import { mapPlayerStats, createRequestBody } from '../util/mappingUtil';
import { LOCAL_HOST, PLAYER_STATS_API, PLAYERS_CONSTANT } from '../constants/propConstants';

export const usePlayerStats = (gamesOrPlayersFlag, selectedPlayer, opposingTeam) => {
  const [playerStats, setPlayerStats] = useState([]);
  useEffect(() => {
    async function getPlayerStats() {
      const playerStatsUrl = LOCAL_HOST + PLAYER_STATS_API;
      const request = createRequestBody();
      addSelectedPlayer(request, selectedPlayer);
      addOpposingTeam(request, opposingTeam);
      console.log('request: ', request)
      const {data} = await axios.post(playerStatsUrl, request)
      const mappedData = mapPlayerStats(data);
      setPlayerStats(mappedData);
    }
    if (gamesOrPlayersFlag === PLAYERS_CONSTANT) {
      getPlayerStats();
    }
  }, [gamesOrPlayersFlag, selectedPlayer, opposingTeam])
  return [playerStats, setPlayerStats];
};

function addWhereClause(request, condition) {
  if (request['where'] && request['where']['and']) {
    request['where']['and'] = { ...request['where']['and'], ...condition };
  } else {
    request['where'] = { and: { ...condition } };
  }
}

function addSelectedPlayer(request, selectedPlayer) {
  if (selectedPlayer.player_id !== null) {
    addWhereClause(request, { player_id: selectedPlayer.player_id });
  }
}

function addOpposingTeam(request, opposingTeam) {
  if (opposingTeam.team_id != null) {
    addWhereClause(request, {
      opposing_team_id: opposingTeam.team_id,
    });
  }
}


// function addSelectedPlayer(request, selectedPlayer) {
//   if (selectedPlayer.player_id !== null) {
//     request['where'] = {
//       and: {
//         player_id: selectedPlayer.player_id,
//       },
//     };
//   }
// }

// function addOpposingTeam(request, opposingTeam) {
//   if (opposingTeam.opposing_team_id != null) {
//     if (request['where']['and']) {
//       request['where']['and'] = {...request['where']['and'],
//       opposing_team_id: opposingTeam.opposing_team_id
//       }
//     } else {
//       request['where'] = {
//         and: { opposing_team_id: opposingTeam.opposing_team_id },
//       };
//     }
//   }
// }
