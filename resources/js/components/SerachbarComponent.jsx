import { Input } from '@mui/material'
import React from 'react'

const SerachbarComponent = ({placeholder, onChange}) => {
  return (
    <Input
      placeholder={placeholder}
      onChange={onChange} />
  )
}

export default SerachbarComponent