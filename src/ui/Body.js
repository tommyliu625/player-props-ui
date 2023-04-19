import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './Body.css';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import {
  PLAYERS_CONSTANT,
  GAMES_CONSTANT
} from '../constants/propConstants';

import { PlayersAutoComplete } from './autocompleteComponents/PlayersAutoComplete';
import { GamesAutoComplete } from './autocompleteComponents/GamesAutoComplete';
import { PlayersGrid } from './tableComponents/PlayersGrid';
import { GamesGrid } from './tableComponents/GamesGrid';
import { useTeamAndPlayersInfo } from '../customHooks/useTeamAndPlayersInfo';
import { usePlayerStats } from '../customHooks/usePlayerStats';
import { useGameStats } from '../customHooks/useGameStats';
import { PlayerAverageStatsForm } from './PlayerAverageStatsForm';
import { TeamAverageStatsForm } from './TeamAverageStatsForm';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Typography } from '@mui/material';
import { findAvgStats, findAvgStatsForGames } from '../util/helperFunctions';

export const Body = () => {
  const [selectedPlayer, setSelectedPlayer] = useState({});
  const [selectedTeam, setSelectedTeam] = useState({});
  const [opposingTeamForPlayers, setOpposingTeamForPlayers] = useState({});
  const [opposingTeamForGames, setOpposingTeamForGames] = useState({});

  const [actualNumGames, setActualGames] = useState(0);
  const [numGames, setNumGames] = useState(0);

  const [gamesOrPlayersFlag, setGamesOrPlayersFlag] = useState('players');

  useEffect(() => {
    setSelectedPlayer({});
    setSelectedTeam({});
    setOpposingTeamForGames({});
    setOpposingTeamForPlayers({});
  }, [gamesOrPlayersFlag]);

  useEffect(() => {
    if (Object.keys(selectedPlayer).length === 0) setOpposingTeamForPlayers({});
  }, [selectedPlayer]);

  useEffect(() => {
    if (Object.keys(selectedTeam).length === 0) setOpposingTeamForGames({});
  }, [selectedTeam]);

  const [playerInfo, teamInfo] = useTeamAndPlayersInfo()

  const [playerStats, setPlayerStats, isFetchingPlayerStats] = usePlayerStats(
    gamesOrPlayersFlag,
    selectedPlayer,
    opposingTeamForPlayers
  );

  const [gameStats, setGameStats, isFetchingGameStats] = useGameStats(
    gamesOrPlayersFlag,
    selectedTeam,
    opposingTeamForGames
  );
  return (
    <>
      <div className='body-content'>
        <ButtonGroup
          variant='contained'
          aria-label='outlined primary button group'
          sx={{ '& > *': { m: 1, pr: 2 } }}
        >
          <Button
            onClick={() => setGamesOrPlayersFlag('players')}
            color='secondary'
          >
            Player Stats
          </Button>
          <Button
            onClick={() => setGamesOrPlayersFlag('games')}
            color='primary'
          >
            Game Stats
          </Button>
        </ButtonGroup>
        {gamesOrPlayersFlag === PLAYERS_CONSTANT ? (
          <PlayersAutoComplete
            playerInfo={playerInfo}
            setSelectedPlayer={setSelectedPlayer}
          />
        ) : (
          <GamesAutoComplete
            teamInfo={teamInfo}
            setSelectedTeam={setSelectedTeam}
            label='NBA Games'
          />
        )}
      </div>
      {Object.keys(selectedPlayer).length > 0 &&
        gamesOrPlayersFlag === PLAYERS_CONSTANT && (
          <div className='filter-card'>
            <PlayerAverageStatsForm
              actualNumGames={actualNumGames}
              findAvgStats={() =>
                findAvgStats(
                  playerStats,
                  numGames,
                  setActualGames,
                  setPlayerStats
                )
              }
              numGames={numGames}
              setNumGames={setNumGames}
            />
            <GamesAutoComplete
              teamInfo={teamInfo}
              setSelectedTeam={setOpposingTeamForPlayers}
              label='Opposing Team'
            />
          </div>
        )}
      {Object.keys(selectedTeam).length > 0 &&
        gamesOrPlayersFlag === GAMES_CONSTANT && (
          <div className='filter-card'>
            <TeamAverageStatsForm
              actualNumGames={actualNumGames}
              findAvgStatsForGames={() =>
                findAvgStatsForGames(
                  gameStats,
                  numGames,
                  setActualGames,
                  setGameStats,
                  selectedTeam
                )
              }
              numGames={numGames}
              setNumGames={setNumGames}
            />
            <GamesAutoComplete
              teamInfo={teamInfo}
              setSelectedTeam={setOpposingTeamForGames}
              label='Opposing Team'
            />
          </div>
        )}
      <div className='player-props-table'>
        {gamesOrPlayersFlag === PLAYERS_CONSTANT ? (
          <PlayersGrid
            playerStats={playerStats}
            isFetchingPlayerStats={isFetchingPlayerStats}
          />
        ) : (
          <GamesGrid
            gameStats={gameStats}
            isFetchingGameStats={isFetchingGameStats}
          />
        )}
      </div>
    </>
  );
};

