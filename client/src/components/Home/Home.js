import React, {useState, useEffect} from 'react';
import Posts from '../Posts/Posts'
import Form from '../Form/Form'
import { Container, Grow, Grid, Paper, AppBar, TextField, Button} from '@material-ui/core';
import { ChipInput } from 'material-ui-chip-input';
import { useHistory, useLocation } from 'react-router-dom'
import  { useDispatch } from 'react-redux'
import { getPosts } from '../../actions/posts';
import { Paginate} from '../Pagination/Pagination';
import App from '../../App';
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

    const handleKeyPress = (event) =>
    {
        if(event.key === 'Enter') 
        {
            console.log('enet');
            searchPost();
        }
        else{
            history.push('/');
        }
    }

    const searchPost = () =>
    {

        if(search.trim())
        {
            //dispatch fetch search post
        }
    }
    return (
        <Grow in> 
            <Container maxWidth="xl"> 
                <Grid container justifyContent="space-between"
                alignItems="stretch" spacing={3} className={classes.gridContainer}> 
                    <Grid item xs={12} sm={6} md={9}> 
                    <Posts setCurrentId = {setCurrentId}/>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}> 
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
        </Grow>
            
    );
}

export default Home;