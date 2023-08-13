import React from "react";
import useStyles from './styles'
import {Card, CardActions, CardContent, CardMedia, Button, Typography} from '@material-ui/core';
import ColoredDotTypography from './ColoredDot';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import {useDispatch} from 'react-redux';
import { deletePost } from "../../../actions/posts";

const Post = ({post, setCurrentId}) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    return (
        <Card className={classes.card}>
            <CardMedia className={classes.media} image={post.selectedFile} title ={post.title} height={3}/>
            <div className={classes.overlay}>
                <Typography variant="h6"> {post.title}</Typography>
                <Typography variant="body2"> {moment(post.createdAt).fromNow()}</Typography>
            </div>

            <div className={classes.overlay2}>
                <Button style = {{color:'white'}} 
                size="small" 
                onClick={() => setCurrentId(post._id)}> 
                    <MoreHorizIcon fontSize="medium"/>
                </Button>
            </div>
            <div>
                <Typography variant="body2" color="textSecondary"> {post.tags.map((tag) => `#${tag} `)}</Typography>
            </div>
            <CardContent>
                <Typography variant="h6" gutterBottom>  {post.message} </Typography>
                <ColoredDotTypography color={post.color} text={post.weatherConditions[0]} />
            </CardContent>
            <CardActions className={classes.CardActions}>
                <Button size="small" style={{ color: 'gray' }} onClick={() => {dispatch(deletePost(post._id))}}> 
                    <DeleteIcon fontSize="small"/>
                    Delete
                </Button>

            </CardActions>
        </Card>
    );
}
export default Post;