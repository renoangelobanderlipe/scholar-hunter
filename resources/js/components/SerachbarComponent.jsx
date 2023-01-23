import { Input } from '@mui/material'
import React from 'react'
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import { Search } from '@mui/icons-material';

const SerachbarComponent = ({ placeholder, onChange }) => {
  const handleOnChange = (value) => {
    onChange(value);
  }

  return (
    <React.Fragment>
      <form>
        <TextField
          id="search-bar"
          className="text"
          onInput={(e) => {
            handleOnChange(e.target.value);
          }}
          label="Enter a city name"
          variant="outlined"
          placeholder={placeholder}
          size="small"
        />
        <IconButton type="submit" aria-label="search">
          <Search style={{ fill: "blue" }} />
        </IconButton>
      </form>
    </React.Fragment>
  )
}

export default SerachbarComponent