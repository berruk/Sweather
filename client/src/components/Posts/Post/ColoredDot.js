import React from 'react';
import {Typography} from '@material-ui/core';

const ColoredDotTypography = ({ color, text }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <div
        style={{
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          backgroundColor: color,
          marginRight: '8px',
          border: `1px solid black`, // Add border for outline
        }}
      />
      <Typography variant="body1">{text}</Typography>
    </div>
  );
};

export default ColoredDotTypography;
