import * as api from '../api';
import {ActionTypes} from '../constants/actionTypes';

export const getPosts = () => async (dispatch) =>
{
    try {
        const data = await api.fetchPosts();
        dispatch({ type: ActionTypes.FETCH_ALL , payload: data});
    } catch (error) {
        console.log(error);
    }    
};

export const createPost = (post) => async (dispatch) => {

    try{
        const { data } = await api.createPost(post);

        dispatch({type: ActionTypes.CREATE, payload : data});
    }
    catch (error){
        console.log(error);
    }
};

export const updatePost = (id, post) => async (dispatch) =>
{
    try {       
        const { data } = await api.updatePost(id, post);
        console.log(data);
        dispatch({type : ActionTypes.UPDATE, payload: data})
    } 
    catch (error) {
        console.log(error);
    }
};

export const deletePost = (id) => async (dispatch) =>
{
    try {;
        await api.deletePost(id);
        dispatch({type: ActionTypes.DELETE, payload: id});
    } catch (error) {
        console.log(error);
    }
}