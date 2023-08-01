import React, {useState, useEffect} from 'react';
import { Avatar, Button, Paper, Grid, Typography, Container} from '@material-ui/core';
import useStyles from './styles';
import LockOutlined from '@material-ui/icons/LockOutlined';
import Input from './Input';
import jwtDecode from 'jwt-decode';
import { useDispatch } from 'react-redux';
import {useHistory} from 'react-router-dom';
import {signIn, signUp} from '../../actions/auth';

const initValues = {
    firstName : '', lastName : '', email : '', password: '', confirmPassword: ''
}

const Auth = () => {
    const classes = useStyles();
    const [showPassword, setShowPassword] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);
    const [formValues, setFormValues] = useState(initValues);
    const dispatch = useDispatch();
    const history = useHistory();

    const handleSubmit = (event) => {
        event.preventDefault();

        if (isSignUp)
        {
            dispatch(signUp(formValues, history));
        }
        else
        {
            dispatch(signIn(formValues, history));
        }
    };

    const handleChange = (event) => {
        //setFormValues({...formValues, [event.target.name] : event.target.value });
    };

    const handleShowPassword = () => setShowPassword((prevState) => !prevState);
    const switchMode = () => {
        setIsSignUp((prevState) => !prevState);
        setShowPassword(false);
    };

    const handleGoogleCallback = async (res) => {
        var userObject = jwtDecode(res?.credential);
        console.log(userObject.given_name);
        try {
            dispatch( { type: 'AUTH', data : {userObject}})
            setFormValues((prevValues) => ({
                firstName: 'henlo',
                lastName: userObject.family_name,
                email :userObject.email

              }));
            console.log("form");
            console.log(formValues);
            dispatch(signUp(formValues, history));
            history.push('/');

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        /* global google */
        google.accounts.id.initialize(
            {
                client_id :"1059782950496-7v8gcqj12tpiabrq2lmlb4nh0e383ibe.apps.googleusercontent.com",
                callback : handleGoogleCallback
            }
        )
        google.accounts.id.renderButton(
            document.getElementById("googleSignIn"),
            { theme: "outline", size : "large" }

        )
    });

  return (
    <Container component= "main" maxWidth="xs">
        <Paper className={classes.paper} elevation={3}>
            <Avatar className={classes.avatar}>
                <LockOutlined/>
            </Avatar>
            <Typography variant='h5'>{isSignUp ? 'Sign Up' : 'Sign in'}</Typography>
            <form className={classes.form} onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    {
                        isSignUp &&
                        (
                            <>
                                <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half/>   
                                <Input name="lastName" label="Last Name" handleChange={handleChange} half/>   
                            </>
                        )
                    }
                    <Input name="email" label="Email Address" handleChange={handleChange} type = "email" />   
                    <Input name="password" label="Password" handleChange={handleChange} 
                    type = {showPassword ? "text" : "password"} 
                    handleShowPassword={handleShowPassword} />   
                    {isSignUp && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} 
                    type = "password"/>   }
                </Grid>               
                <Button type = "submit" fullWidth variant='contained' color='primary' className={classes.submit}>
                    {isSignUp ? "Sign Up" : "Sign In"}
                </Button>
                <div id="googleSignIn"></div>
                <Grid container justifyContent="flex-end">
                    <Button onClick={switchMode}>
                        {
                            isSignUp ? "Sign In" : "Don't have an account, Sign Up"
                        }
                    </Button>
                </Grid>
            </form>
        </Paper>
    </Container>
  )
}

export default Auth;
