/* eslint-disable react-hooks/exhaustive-deps */
import {useState, useEffect} from 'react';
import axios from 'axios';
import { mapPlayerStats, createRequestBody, addSelectedPlayer, addOpposingTeam, addDates, addPagination} from '../util/mappingUtil';
import { LOCAL_HOST, PLAYER_PROPS_API, PLAYER_STATS_API, PLAYERS_CONSTANT } from '../constants/propConstants';

export const usePlayerStats = (
  gamesOrPlayersFlag,
  selectedPlayer,
  opposingTeam,
  dates,
  paginationModel
) => {
  const [playerStats, setPlayerStats] = useState([]);
  const [isFetchingPlayerStats, setIsFetchingPlayerStats] = useState(false);
  useEffect(() => {
    async function getPlayerStats() {
      const playerStatsUrl = LOCAL_HOST + PLAYER_PROPS_API;
      const request = createRequestBody();
      addSelectedPlayer(request, selectedPlayer.player_id);
      addOpposingTeam(request, opposingTeam.team_id);
      addDates(request, dates);
      addPagination(request, paginationModel);
      setIsFetchingPlayerStats(true);
      const { data } = await axios.post(playerStatsUrl, request);
      setIsFetchingPlayerStats(false);
      const mappedData = mapPlayerStats(data);
      setPlayerStats(mappedData);
    }
    if (gamesOrPlayersFlag === PLAYERS_CONSTANT) {
      getPlayerStats();
    }
  }, [selectedPlayer, opposingTeam, dates, paginationModel]);
  return [playerStats, setPlayerStats, isFetchingPlayerStats];
};


