import * as api from '../api';
import {ActionTypes} from '../constants/actionTypes';
import { useHistory } from 'react-router-dom';
export const getPosts = () => async (dispatch) =>
{
    try {
        const creator = localStorage.getItem('profile');
        const id = JSON.parse(creator).result._id;
        const data = await api.fetchPosts(id);
        dispatch({ type: ActionTypes.FETCH_ALL , payload: data});
    } catch (error) {
        console.log(error);
    }    
};


export const getPostsBySearch = (query) => async (dispatch) =>
{
    try {
        const {data : {data}} = await api.fetchPostsBySearch(query);
        dispatch({ type: ActionTypes.SEARCH , payload: data});
        console.log(data);
    } catch (error) {
        console.log(error);
    }    
};

export const createPost = (post) => async (dispatch) => {

    try{
        const creator = localStorage.getItem('profile');
        const id = JSON.parse(creator).result._id;
        const name = JSON.parse(creator).result.name;
        const { data } = await api.createPost({post: post, id: id, creator: name});
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

export const filterPost = () => async (dispatch) =>
{
    try {;
        const { data } = await api.filterPost();
        console.log(data);
        dispatch({type: ActionTypes.FILTER, payload: data});
    } catch (error) {
        console.log(error);
    }
}