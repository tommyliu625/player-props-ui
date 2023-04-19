import {useEffect, useState} from 'react';
import { LOCAL_HOST,GAMES_CONSTANT, GAME_INFO_API } from '../constants/propConstants';
import axios from 'axios';
import { mapGameStats, createRequestBody } from '../util/mappingUtil';

export const useGameStats = (
  gamesOrPlayersFlag,
  selectedTeam,
  opposingTeamForGames
) => {
  const [gameStats, setGameStats] = useState([]);
  const [isFetchingGameStats, setIsFetchingGameStats] = useState(false);

  useEffect(() => {
    async function getGameStats() {
      const gameInfoUrl = LOCAL_HOST + GAME_INFO_API;
      const request = createRequestBody();
      addSelectedTeam(request, selectedTeam);
      let mappedData;
      if (Object.keys(opposingTeamForGames).length > 0) {
        mappedData = addOpposingTeam([...gameStats] ,opposingTeamForGames);
      } else {
        setIsFetchingGameStats(true);
        let response = await axios.post(gameInfoUrl, request);
        setIsFetchingGameStats(false);
        mappedData = mapGameStats(response.data);
      }
      setGameStats(mappedData);
    }
    if (gamesOrPlayersFlag === GAMES_CONSTANT) {
      getGameStats();
    }
  }, [gamesOrPlayersFlag, selectedTeam, opposingTeamForGames]);
  return [gameStats, setGameStats, isFetchingGameStats];
};

function addSelectedTeam(request,selectedTeam) {
  if (Object.keys(selectedTeam).length > 0) {
    request['where'] = {
      or: {
        at_id: selectedTeam.team_id,
        ht_id: selectedTeam.team_id,
      },
    };
  }
}

function addOpposingTeam(gameStats, opposingTeamForGames) {
  return gameStats.filter(info => {
    const {ht_full_name, at_full_name} = info;
    return (
      opposingTeamForGames.full_name === ht_full_name ||
      opposingTeamForGames.full_name === at_full_name
    );
  })
}
