import React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const ThreeGameAvgPercentFilterForm = ({percentFilter, setter}) => {
  // Component logic goes here

  const handleChange = (event) => {
    setter(event.target.value);
  };

  return (
    // JSX code goes here
    <FormControl sx={{ width: '240px' }}>
      <InputLabel id="demo-simple-select-label">3 Game Avg % Difference</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={percentFilter}
        label="Filter Line Score / Last 3 Game Avg Percentage"
        onChange={handleChange}
      >
        <MenuItem value={0}>0</MenuItem>
        <MenuItem value={10}>10</MenuItem>
        <MenuItem value={20}>20</MenuItem>
        <MenuItem value={30}>30</MenuItem>
        <MenuItem value={40}>40</MenuItem>
        <MenuItem value={50}>50</MenuItem>
      </Select>
    </FormControl>
  );
};

export default ThreeGameAvgPercentFilterForm;
