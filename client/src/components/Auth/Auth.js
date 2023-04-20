import React, {useState} from 'react';
import { Avatar, Button, Paper, Grid, Typography, Container, TextField } from '@material-ui/core';
import useStyles from './styles';
import LockOutlined from '@material-ui/icons/LockOutlined';
import Input from './Input';

const Auth= () => {
    const classes = useStyles();
    const [showPassword, setShowPassword] = useState(false);
    const [signUp, setIsSignUp] = useState(false);

    const handleSubmit = () => {};
    const handleChange = () => {};
    const handleShowPassword = () => setShowPassword((prevState) => !prevState);
    const switchMode = () => {
        setIsSignUp((prevState) => !prevState);
        handleShowPassword(false);
    };

  return (
    <Container component= "main" maxWidth="xs">
        <Paper className={classes.paper} elevation={3}>
            <Avatar className={classes.avatar}>
                <LockOutlined/>
            </Avatar>
            <Typography variant='h5'>{signUp ? 'Sign Up' : 'Sign in'}</Typography>
            <form className={classes.form} onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    {
                        signUp &&
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
                    {signUp && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} 
                    type = "password"/>   }
                </Grid>
                <Button type = "submit" fullWidth variant='contained' color='primary' className={classes.submit}>
                    {signUp ? "Sign Up" : "Sign In"}
                </Button>
                <Grid container justifyContent="flex-end">
                    <Button onClick={switchMode}>
                        {
                            signUp ? "Sign In" : "Don't have an account, Sign Up"
                        }
                    </Button>
                </Grid>
            </form>
        </Paper>
    </Container>
  )
}

export default Auth;
