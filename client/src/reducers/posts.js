import {ActionTypes} from '../constants/actionTypes';

export default (posts = [], action) =>
{
    switch (action.type) {
        case ActionTypes.FETCH_ALL:
            return action.payload;
        case ActionTypes.CREATE:           
            return [...posts, action.payload]; //spread all posts and add the new post
        case ActionTypes.UPDATE: //applies method to all elements of array
            return posts.data.map((post) => post._id === action.payload._id ? action.payload : post);
        case ActionTypes.DELETE:
            return posts.data.filter((post) => post._id !== action.payload); 
        case ActionTypes.FILTER:
            return action.payload;
        default:
            return posts;
    }
}