import React, {useState, useEffect} from "react";
import { AppBar, Avatar, Button, Toolbar, Typography} from '@material-ui/core';
import sweather from '../../images/sweather.png';
import useStyles from './styles';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from "react-redux"
import { parse } from "dotenv";

const Navbar = () => {
    const classes = useStyles();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const [displayName, setDisplayName] = useState('');
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();

    const logout = () =>
    {
        dispatch({type: 'LOGOUT'});
        history.push('/');
        setUser(null);
    }

    useEffect(() =>  
    {
        if (localStorage.getItem('profile'))
        {
            const parsedUser = JSON.parse(localStorage.getItem('profile'));
            
            if (parsedUser.hasOwnProperty('userObject')){
                setDisplayName(parsedUser?.userObject?.given_name + " " + parsedUser?.userObject?.family_name);
            }
            else
            {
                setDisplayName(parsedUser.result.name);
            }
            
            setUser(parsedUser);
        }
           
    }, [location]);

    
    return (
    <AppBar className = {classes.appBar} position = "static" color="inherit">
        <div className={classes.brandContainer}>
            <Typography component = {Link} to='/' className = {classes.heading} variant="h2" align="center"> Sweather </Typography>
            <img className = {classes.image} src = {sweather} alt = "items" height = "60"/>
        </div>
        <Toolbar className= {classes.toolbar}>
            {
                user?
                (
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} >                 
                        {displayName.charAt(0)}  
                        </Avatar>
                        <Typography className={classes.userName} variant="h6">
                        {displayName} 
                        </Typography>
                        <Button variant="contained" className={classes.logout} onClick={logout}>Logout</Button>
                    </div>
                )
                :
                (
                    <div>
                        <Button variant="contained" component = {Link} to="/auth" style={{background : '#d1e6e3'}} className={classes.logout}>Login</Button>
                    </div>
                )
            }
        </Toolbar>
    </AppBar>
    );
}

export default Navbar;