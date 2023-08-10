import React from 'react';
import { Select, FormControl, MenuItem, InputLabel } from '@material-ui/core';

export default function Dropdown({ options, label, value, onChange }) {
  const handleChange = (event) => {
    onChange(event.target.value);
  };

  return (
    <div style={{ marginBottom: '20px', paddingLeft: '10px', paddingRight: '10px'  }}>
    <FormControl sx={{ m: 1, minWidth: 80 }}>
        <InputLabel id="auto-width-label">{label}</InputLabel>
        <Select
          labelId="auto-width-label"
          value={value}
          onChange={handleChange}
          autoWidth
          label={label}
        >
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}