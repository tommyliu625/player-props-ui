import React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export const GamesAutoComplete = ({
  teamInfo,
  setSelectedTeam,
  label,
  resetGameStates,
}) => {
  return (
    <Autocomplete
      key='games-auto-complete'
      disablePortal
      id='games-auto-complete'
      options={teamInfo}
      sx={{ width: 300 }}
      renderInput={(params) => (
        <TextField
          {...params}
          // InputLabelProps={{ shrink: true }}
          label={label}
        />
      )}
      onChange={(event, value, reason) => {
        if (resetGameStates !== undefined) {
          if (value === null) {
            resetGameStates();
          } else {
            setSelectedTeam(value ?? {});
          }
        } else {
          setSelectedTeam(value ?? {});
        }
      }}
    />
  );
};
