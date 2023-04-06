import {useEffect, useState} from 'react';
import { LOCAL_HOST, PLAYER_INFO_API, TEAM_INFO_API } from '../constants/propConstants';
import axios from 'axios';
import { mapPlayerInfo, mapTeamInfo } from '../util/mappingUtil';

export const useTeamAndPlayersInfo = () => {
  const [playerInfo, setPlayerInfo] = useState([]);
  const [teamInfo, setTeamInfo] = useState([]);

  const playerInfoUrl = LOCAL_HOST + PLAYER_INFO_API;
  const teamInfoUrl = LOCAL_HOST + TEAM_INFO_API;
  useEffect(() => {
    async function getData() {
      console.log('Calling API');
      const request = {
        where: {},
        orderBy: {},
      };
      const dataPoints = await Promise.all([
        axios.post(playerInfoUrl, request),
        axios.post(teamInfoUrl, request),
      ]);
      setPlayerInfo(mapPlayerInfo(dataPoints[0].data));
      const test = mapTeamInfo(dataPoints[1].data);
      setTeamInfo(test);
    }
    getData();
  }, [playerInfoUrl, teamInfoUrl]);

  return [playerInfo, teamInfo];
};
