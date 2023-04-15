import React from "react";
import {Grid, CircularProgress} from '@material-ui/core';
import Post from './Post/Post';
import useStyles from './styles';
import  {useSelector} from 'react-redux';

const Posts = ({setCurrentId}) => {
    const classes = useStyles();
    const posts = useSelector((state) => state.posts);

    return (
        !posts?.data?.length ? <CircularProgress /> : ( 
        <Grid className={classes.container} container alignItems="stretch" spacing={3}> 
            {//indicates js logic
                posts.data.map((post) => (
                    <Grid key={post._id} item xs={12} sm={6}>
                            <Post post = {post} setCurrentId ={setCurrentId}/>
                    </Grid>
                ))
                }
        </Grid>
        )
    );
}
export default Posts;