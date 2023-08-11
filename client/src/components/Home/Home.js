import React, {useState, useEffect} from 'react';
import Posts from '../Posts/Posts'
import Form from '../Form/Form'
import Weather from '../Weather/Weather'
import { Container, Grow, Grid, Paper, AppBar, TextField, Button, Typography} from '@material-ui/core';
import { useHistory, useLocation } from 'react-router-dom'
import  { useDispatch } from 'react-redux'
import { getPosts, getPostsBySearch, filterPost } from '../../actions/posts';
import { getWeather } from '../../actions/weather';
import { Paginate} from '../Pagination/Pagination';
import useStyles from './styles'

function useQuery()
{
    return new URLSearchParams(useLocation().search);
}
const Home = () =>
{
    const [currentId, setCurrentId] = useState(null); //app is the only parent to both form and post, id is null at the beginning
    const dispatch = useDispatch();
    const query = useQuery();
    const history = useHistory();
    const page = query.get('page') || 1;
    const searchQuery = query.get('searchQuery');
    const classes = useStyles();
    const [search, setSearch] = useState('');

    useEffect(() => {
        dispatch(getPosts());
    }, [currentId, dispatch]);

    useEffect(() => {
        dispatch(getWeather());
    }, [dispatch]);

    const handleKeyPress = (event) =>
    {
        if(event.key === 'Enter') 
        {
            searchPost();
        }

    }

    const searchPost = () =>
    {
        if(search.trim())
        {
            dispatch(getPostsBySearch({search}))
        }
        else{
            history.push('/');
        }
    }

    const getRecommendation = () =>
    {
        console.log("recommend");
        dispatch(filterPost());
    }

    let id;
    try {
        const user = localStorage.getItem('profile');
        id = JSON.parse(user).userObject.sub;
    } 
    catch (error) {
        console.log(error);
    }
    return (
        id === undefined ? (
            // Show "Welcome" text when id is undefined
            <Container maxWidth="xl" className = {classes.container}> 
            <Typography className = {classes.maintitle} variant="h6"> welcome to Sweather </Typography>
        </Container>
          ) : (
        <Grow in> 
            <Container maxWidth="xl"> 
                <Grid container justifyContent="space-between"
                alignItems="stretch" spacing={3} className={classes.gridContainer}> 
                    <Grid item xs={12} sm={6} md={9}> 
                    <Posts setCurrentId = {setCurrentId}/>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}> 
                    <AppBar className={classes.weatherDisplay} position='static' color='inherit'>
                    <Weather/>     
                    <Button  variant="contained" size="small"  
                    style={{background : '#d1e6e3', margin: '10px 0', borderRadius: '15px',}} 
                    onClick={getRecommendation} fullWidth> Today's Outfit </Button>    
                    </AppBar>
                    <AppBar className={classes.appBarSearch} position='static' color='inherit'>
                    <TextField 
                        name="search" 
                        variant="outlined"
                        label="Search outfit"
                        fullWidth
                        value={search}
                        onKeyDown={handleKeyPress}
                        onChange={(event) => setSearch(event.target.value)} />
                    <Button  variant="contained" size="small"  
                    style={{background : '#d1e6e3', margin: '10px 0', borderRadius: '15px',}} 
                    onClick={searchPost} fullWidth> Search</Button>                   
                    </AppBar>
                    <Form setCurrentId = {setCurrentId} currentId = {currentId}/>
                    <Paper >
                        <Paginate/>
                    </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Grow>)
            
    );
}

export default Home;