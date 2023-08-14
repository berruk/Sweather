import React from "react";
import Typography from "@material-ui/core/Typography";
import  {useSelector} from 'react-redux';

const Weather = () => {
  const weatherData = useSelector((state) => state.weather);
  const { description, temperature, location } = weatherData;
  
  const formattedDescription = description ? 
    description.charAt(0).toUpperCase() + description.slice(1) : '';
  const formattedTemperature = temperature ? 
    parseFloat(temperature.toFixed(1)) : 0;

  return (
    <div>
        <Typography style={{padding: '10px' }} variant="h5" color="textSecondary">
          {formattedTemperature}
          <span>&#176;</span>
          {"C"}
        </Typography>
        <Typography style={{ padding: '10px' }} variant="h6" color="textSecondary">
          {formattedDescription}
        </Typography>
        <Typography style={{ padding: '10px' }} variant="h6" color="textSecondary">
          {location}
        </Typography>       
    </div>
  );
};

export default Weather;