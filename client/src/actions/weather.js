import * as api from '../api';
import {ActionTypes} from '../constants/actionTypes';

export const getWeather = () => async (dispatch) =>
{
    try {     
        const data = await api.fetchWeather();
        dispatch({ type: ActionTypes.FETCH_WEATHER , payload: data.data});

    } catch (error) {
        console.log(error);
    }    
};