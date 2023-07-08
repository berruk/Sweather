import axios from 'axios'

const API = axios.create({baseURL: 'http://localhost:5000'})

export const fetchPosts = () => API.get('/posts');
export const fetchPostsBySearch = (query) => API.get(`/posts/search?query=${query.search || 'none'}`);
export const createPost = (newPost) => API.post('/posts', newPost);
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const signIn = (formValues) => API.post('/user/signin', formValues);
export const signUp = (formValues) => API.post('/user/signup', formValues);
export const fetchWeather = () => API.get('/weather');