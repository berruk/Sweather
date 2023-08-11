import axios from 'axios';
import mongoose from 'mongoose';
import User from './user.js'

const postSchema = mongoose.Schema({
    title : String,
    message: String,
    creator: String,
    id: String,
    tags: [String],
    color: {
        type: String,
        enum: ['white', 'black', 'blue'],
    },
    weatherConditions: [{
        type: String,
        enum: ['sunny', 'Rainy', 'cold'],
    }],
    selectedFile : String,
    createdAt : {
        type : Date,
        default : new Date()
    
    },
});

const PostMessage = mongoose.model('PostMessage', postSchema);

export default PostMessage;