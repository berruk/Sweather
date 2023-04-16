import React, {useState, useEffect} from 'react';
import Posts from '../Posts/Posts'
import Form from '../Form/Form'
import { Container, Grow, Grid} from '@material-ui/core';
import  { useDispatch } from 'react-redux'
import { getPosts } from '../../actions/posts';

const Home = () =>
{
    const [currentId, setCurrentId] = useState(null); //app is the only parent to both form and post, id is null at the beginning
    
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPosts());
    }, [currentId, dispatch]);

    return (
        <Grow in> 
            <Container> 
                <Grid container justify="space-between"
                alignItems="stretch"> 
                    <Grid item xs={12} sm={7}> 
                    <Posts setCurrentId = {setCurrentId}/>
                    </Grid>
                    <Grid item xs={12} sm={4}> 
                    <Form setCurrentId = {setCurrentId} currentId = {currentId}/>
                    </Grid>
                </Grid>
            </Container>
        </Grow>
            
    );
}

export default Home;