import React from 'react'
import TextField from '@mui/material/TextField';

const SerachbarComponent = ({ placeholder, onChange }) => {
  const handleOnChange = (value) => {
    onChange(value);
  }

  return (
    <React.Fragment>
      <TextField
        sx={{ width: '50%' }}
        id="search-bar"
        className="text"
        onInput={(e) => {
          handleOnChange(e.target.value);
        }}
        label="Enter a keyword"
        variant="outlined"
        placeholder={placeholder}
        size="medium"
      />
    </React.Fragment>
  )
}

export default SerachbarComponent