import React, {useState, useEffect} from "react";
import useStyles from './styles'
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";

import {createPost, updatePost} from '../../actions/posts';

const Form = ({currentId, setCurrentId}) => {
    const [postData, setPostData] = useState({creator :'', title: '', message:'', tags:'', selectedFile:''}); //initial properties  
    const posts = useSelector((state) => state.posts.data);
    const post = currentId ? posts.find((p) => p._id === currentId) : null;

    const classes = useStyles();
    const dispatch = useDispatch();

    useEffect(() => {
        if(post) setPostData(post); 
    }, [post]) // will run when changes

    const handleSubmit = (event) => // onsubmit event
    {
        event.preventDefault(); // if the event doesnt get explicitly handled, default action shouldnt be taken as it normally would be.
        //action will only be defined by the below implementation

        if(currentId)
        {
            dispatch(updatePost(currentId, postData));
        }
        else{          
            dispatch(createPost(postData));
        }
        
        clear();
    }

    const clear = () =>
    {
        setCurrentId(null); //reset
        setPostData({creator :'', title: '', message:'', tags:'', selectedFile:''})
    }

    return (
        <Paper className = {classes.paper}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant="h6">{currentId ? 'Edit' : 'Create'} an Outfit </Typography>
                <TextField name="creator" variant="outlined" label="Title" fullWidth value={postData.title}onChange={(e) => setPostData({...postData, title: e.target.value})}/>
                <TextField name="creator" variant="outlined" label="Message" fullWidth value={postData.message}onChange={(e) => setPostData({...postData, message: e.target.value})}/>
                <TextField name="creator" variant="outlined" label="Tags" fullWidth value={postData.tags}onChange={(e) => setPostData({...postData, tags: e.target.value.split(',')})}/>
                <div className={classes.fileInput}>
                    <FileBase type = "file" multiple={false} onDone={({base64}) => setPostData({...postData, selectedFile: base64})}/>
                    </div>
                <Button className={classes.buttonSubmit} variant="contained" style={{background : '#d1e6e3'}} size="large"  type="submit" fullWidth>Submit</Button>
                <Button className={classes.buttonSubmit} variant="contained"  size="small" style={{background : '#f2f2f2'}}  onClick={clear} fullWidth>Clear</Button>
            </form>
        </Paper>
    );
}
export default Form;