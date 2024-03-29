import * as api from '../api';
import {ActionTypes} from '../constants/actionTypes';


export const signIn = (formData, history) => async (dispatch) =>
{
    try {
        const {data} = await api.signIn(formData);
        dispatch({type : ActionTypes.AUTH, data});
        history.push('/');
    } catch (error) {
        console.log(error);
    }
};

export const signUp = (formData, history) => async (dispatch) =>
{
    try {
        const {data} = await api.signUp(formData);
        dispatch({type :ActionTypes.AUTH, data});
        history.push('/');
    } catch (error) {
        console.log(error);
    }
};