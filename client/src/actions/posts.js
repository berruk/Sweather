import { json } from 'react-router-dom';
import * as api from '../api';
import {ActionTypes} from '../constants/actionTypes';

export const getPosts = () => async (dispatch) =>
{
    try {
        const creator = localStorage.getItem('profile');
        const id = JSON.parse(creator).userObject.sub;
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
        const subValue = JSON.parse(creator).userObject.sub;
        const name = JSON.parse(creator).userObject.name;
        const { data } = await api.createPost({post: post, id: subValue, creator: name});

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