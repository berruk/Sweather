import { combineReducers } from "redux";
import posts from './posts';
import authReducer from "./auth";
import weather from "./weather";

export default combineReducers({
   posts: posts , authReducer, weather: weather
});