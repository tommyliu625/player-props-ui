import React, {useState} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
export const PlayerAverageStatsForm = ({
  actualNumGames,
  findAvgStats,
  numGames,
  setNumGames,
}) => {

  return (
    <>
      <div className='fd-col'>
        <Typography variant='subtitle1' sx={{ fontWeight: 'bold', mr: 1 }}>
          Average stats for last {actualNumGames === 0 ? '#' : actualNumGames}{' '}
          of games
        </Typography>
        <Box
          component='form'
          sx={{
            display: 'flex',
            flexDirection: 'row',
            '& > :not(style)': { m: 1, width: '10ch' },
          }}
          // noValidate
          autoComplete='off'
          onSubmit={(e) => {
            e.preventDefault();
            if (numGames > 0) findAvgStats();
          }}
          onBlur={(e) => {
            if (numGames > 0) findAvgStats();
          }}
        >
          <TextField
            type='number'
            min='1'
            id='outlined-basic'
            label=''
            variant='outlined'
            InputProps={{
              inputProps: {
                min: 1, // set minimum value to 1
              },
            }}
            value={numGames}
            onChange={(e) => setNumGames(parseInt(e.target.value))}
            placeholder='ie. 10..'
          />
          <Button
            type='submit'
            sx={{ m: 1, width: '10ch' }}
            onClick={() => findAvgStats()}
          >
            Submit
          </Button>
        </Box>
      </div>
    </>
  );
};
