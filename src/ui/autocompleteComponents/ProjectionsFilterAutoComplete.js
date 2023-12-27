import {useState} from 'react';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';


const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const ProjectionsFilterAutoComplete = ({autoCompleteValues, setter, filter}) => {
  // Your component logic goes here

  const handleSelected = (e, values) => {
    setter(values)
  }

  return (
    // Your JSX code goes here
    <Autocomplete
      multiple
      id="checkboxes-tags-demo"
      options={autoCompleteValues}
      disableCloseOnSelect
      getOptionLabel={(option) => option}
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
            o
          />
          {option}
        </li>
      )}
      style={{ width: 250 }}
      renderInput={(params) => (
        <TextField {...params} placeholder={`Filter By ${filter}`} />
      )}
      onChange={handleSelected}
    />
  );
};

export default ProjectionsFilterAutoComplete;
