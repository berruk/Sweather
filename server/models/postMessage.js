import axios from 'axios';
import mongoose from 'mongoose';
import User from './user.js'

const postSchema = mongoose.Schema({
    title : String,
    message: String,
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    tags: [String],
    selectedFile : String,
    likeCount : {
        type:Number,
        default : 0
    },
    createdAt : {
        type : Date,
        default : new Date()
    
    },
});

const PostMessage = mongoose.model('PostMessage', postSchema);

export default PostMessage;