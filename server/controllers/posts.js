import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";

export const getPosts = async (req, res) => {
    
    const { id } = req.params;
    try {
        const posts = await PostMessage.find({id: id}); 
 
        res.status(200).json(posts);

    } catch (error) {
        console.log(error.message)
        res.status(404).json( {message : error.message});
    }
}

export const getPostsBySearch = async (req, res) => {
    const {query} = req.query;

    try {
        const title = new RegExp(query, 'i');
        const posts = await PostMessage.find({title: title}); 
        res.status(200).json({data: posts});

    } catch (error) {
        res.status(404).json( {message : error.message});
    }
}

export const createPost = async (req, res) => {
    
    const newPost = new PostMessage({
        title: req.body.post.title,
        message: req.body.post.message,
        selectedFile: req.body.post.selectedFile,
        color: req.body.post.color,
        weatherConditions: [req.body.post.weather],
        id: req.body.id,
        creator: req.body.creator
    });
    console.log(newPost);
    try {
        await newPost.save(); 
        res.status(200).json(newPost);
    } catch (error) {
        res.status(409).json( {message : error.message});
        console.log(error);
    }
}

export const updatePost = async (req, res) =>
{
    const { id : _id } = req.params; // extract id and rename to _id
    const post = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id))
        return res.status(404).send('No post with such id.');

    const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, {new: true}); // new:true receive updated version of the post.
    res.json(updatedPost);    

}

export const deletePost = async (req, res) =>
{
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send('No post with such id.');
    
    await PostMessage.findByIdAndRemove(id);
    res.json({message: 'Post deleted successfully.'});
}
