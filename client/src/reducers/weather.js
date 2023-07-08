import {ActionTypes} from '../constants/actionTypes';

export default (weatherData = [], action) =>
{
    switch (action.type) {
        case ActionTypes.FETCH_WEATHER:
            return action.payload;
        default:
            return weatherData;
    }
}
