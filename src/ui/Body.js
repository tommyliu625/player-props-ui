import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './Body.css';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { PLAYERS_CONSTANT, GAMES_CONSTANT } from '../constants/propConstants';
import { PlayersAutoComplete } from './autocompleteComponents/PlayersAutoComplete';
import { GamesAutoComplete } from './autocompleteComponents/GamesAutoComplete';
import { PlayersGrid } from './tableComponents/PlayersGrid';
import { GamesGrid } from './tableComponents/GamesGrid';
import { useTeamAndPlayersInfo } from '../customHooks/useTeamAndPlayersInfo';
import { usePlayerStats } from '../customHooks/usePlayerStats';
import { useGameStats } from '../customHooks/useGameStats';
import { PlayerAverageStatsForm } from './PlayerAverageStatsForm';
import { TeamAverageStatsForm } from './TeamAverageStatsForm';
import { findAvgStats, findAvgStatsForGames, dateString } from '../util/helperFunctions';
import { DateRangePicker } from 'react-dates';
import moment from 'moment';

export const Body = () => {
  const [selectedPlayer, setSelectedPlayer] = useState({});
  const [selectedTeam, setSelectedTeam] = useState({});
  const [opposingTeamForPlayers, setOpposingTeamForPlayers] = useState({});
  const [opposingTeamForGames, setOpposingTeamForGames] = useState({});

  const [startDate, setStartDate] = useState(moment().subtract(1, 'days'));
  const [endDate, setEndDate] = useState(moment().subtract(1, 'days'));
  const [dates, setDates] = useState([]);
  const [focusedInput, setFocusedInput] = useState(null);

  const [actualNumGames, setActualGames] = useState(0);
  const [numGames, setNumGames] = useState(0);

  const [gamesOrPlayersFlag, setGamesOrPlayersFlag] = useState('players');

  const resetPlayerStates = useCallback(() => {
    setSelectedPlayer({});
    setOpposingTeamForPlayers({});
    setNumGames(0);
    setActualGames(0);
  }, []);

  const resetGameStates = useCallback(() => {
    setSelectedTeam({});
    setOpposingTeamForGames({});
    setNumGames(0);
    setActualGames(0);
  }, []);

  useEffect(() => {
    if (gamesOrPlayersFlag === 'players') resetPlayerStates();
    else if (gamesOrPlayersFlag === 'games') resetGameStates();
  }, [gamesOrPlayersFlag]);

  const [playerInfo, teamInfo] = useTeamAndPlayersInfo();

  const [playerStats, setPlayerStats, isFetchingPlayerStats] = usePlayerStats(
    gamesOrPlayersFlag,
    selectedPlayer,
    opposingTeamForPlayers,
    dates
  );

  const [gameStats, setGameStats, isFetchingGameStats] = useGameStats(
    gamesOrPlayersFlag,
    selectedTeam,
    opposingTeamForGames,
    dates
  );

  function applyDates() {
    setDates([dateString(startDate), dateString(endDate)]);
  }

  function resetDates() {
    setDates([]);
  }
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
            sx={{
              backgroundColor: `${
                gamesOrPlayersFlag === 'players' ? '#0d86ae' : '#b6b6b6'
              }`,
            }}
            // color='secondary'
          >
            Player Stats
          </Button>
          <Button
            onClick={() => setGamesOrPlayersFlag('games')}
            sx={{
              backgroundColor: `${
                gamesOrPlayersFlag === 'games' ? '#0d86ae' : '#b6b6b6'
              }`,
            }}
          >
            Game Stats
          </Button>
        </ButtonGroup>
        {gamesOrPlayersFlag === PLAYERS_CONSTANT ? (
          <PlayersAutoComplete
            playerInfo={playerInfo}
            setSelectedPlayer={setSelectedPlayer}
            resetPlayerStates={resetPlayerStates}
          />
        ) : (
          <GamesAutoComplete
            teamInfo={teamInfo}
            setSelectedTeam={setSelectedTeam}
            label='NBA Games'
            resetGameStates={resetGameStates}
          />
        )}
        <div id='calendar-group' style={{}}>
          <DateRangePicker
            startDate={startDate}
            startDateId='start_date_id'
            endDate={endDate}
            endDateId='end_date_id'
            onDatesChange={({ startDate, endDate }) => {
              setStartDate(startDate);
              setEndDate(endDate);
            }}
            focusedInput={focusedInput}
            onFocusChange={(fi) => setFocusedInput(fi)}
            isOutsideRange={(day) => day.isAfter(moment().subtract(1, 'day'))}
          />
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <Button type='submit' onClick={applyDates}>
              Apply Dates
            </Button>
            <Button type='submit' onClick={resetDates}>
              Reset Dates
            </Button>
          </div>
        </div>
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
