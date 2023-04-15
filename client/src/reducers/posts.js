export default (posts = [], action) =>
{
    switch (action.type) {
        case 'FETCH_ALL':
            return action.payload;
        case 'CREATE':           
            return [...posts, action.payload]; //spread all posts and add the new post
        case 'UPDATE': //applies method to all elements of array
            return posts.data.map((post) => post._id === action.payload._id ? action.payload : post);
        case 'DELETE':
            console.log(action.payload);
            return posts.data.filter((post) => post._id !== action.payload); 
        default:
            return posts;
    }
}