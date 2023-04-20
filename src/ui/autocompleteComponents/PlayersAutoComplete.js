import React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export const PlayersAutoComplete = ({
  playerInfo,
  setSelectedPlayer,
  resetPlayerStates,
}) => {
  return (
    <>
      <Autocomplete
        key='players-auto-complete'
        disablePortal
        id='players-auto-complete'
        options={playerInfo}
        sx={{ width: 300 }}
        renderInput={(params) => (
          <TextField
            {...params}
            // InputLabelProps={{ shrink: true }}
            label='NBA Players'
          />
        )}
        onChange={(event, value, reason) => {
          if (value === null) {
            resetPlayerStates();
          } else {
            setSelectedPlayer(value);
          }
        }}
      />
    </>
  );
};

