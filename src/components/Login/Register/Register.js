import { Container, Typography, TextField,Alert } from '@mui/material';
import React, { useState } from 'react';
import { Grid } from '@mui/material';
import { NavLink, useHistory } from 'react-router-dom';
import useAuth from '../../../Hooks/useAuth';
import loader from './../../../images/loginloading.gif'
import RegisterBanner from './../../../images/register.png'
const Register = ({limit,verifyEmail}) => {
    const [loginData, setLoginData] = useState({});
    const history = useHistory();
    const { user, registerUser, isLoading, authError } = useAuth();

    const handleOnBlur = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newLoginData = { ...loginData };
        newLoginData[field] = value;
        setLoginData(newLoginData);
    }
    const handleLoginSubmit = e => {
        if (loginData.password !== loginData.password2) {
            alert('Your password did not match');
            return
        }
        registerUser(loginData.email, loginData.password, loginData.name, history);
        e.preventDefault();
    }
    return (
        <Container>
            <Grid container spacing={2}>
                <Grid item sx={{ mt: 8 }} xs={12} md={6}>
                    <Typography variant="body1" gutterBottom>Register</Typography>
                    {!isLoading && <form onSubmit={handleLoginSubmit}>
                        <TextField
                            sx={{ width: '75%', m: 1 }}
                            id="standard-basic"
                            label="Your Name"
                            name="name"
                            onBlur={handleOnBlur}
                            variant="standard" />
                        <TextField
                            sx={{ width: '75%', m: 1 }}
                            id="standard-basic"
                            label="Your Email"
                            name="email"
                            type="email"
                            onBlur={handleOnBlur}
                            variant="standard" />
                        <TextField
                            sx={{ width: '75%', m: 1 }}
                            id="standard-basic"
                            label="Your Password"
                            type="password"
                            name="password"
                            onBlur={handleOnBlur}
                            variant="standard" />
                        <TextField
                            sx={{ width: '75%', m: 1 }}
                            id="standard-basic"
                            label="ReType Your Password"
                            type="password"
                            name="password2"
                            onBlur={handleOnBlur}
                            variant="standard" />
                        <div className='d-lg-inline-flex'>
                        <button className='Signinbtn me-2' sx={{ width: '75%', m: 1 }} type="submit" variant="contained">Register</button>
                        <br/>
                        <NavLink
                            style={{ textDecoration: 'none',marginTop:'10px' }}
                            to="/login">
                            <a href='#login'>Already Registered? Please Login <i className="fal fa-lock-open"></i></a>
                        </NavLink>
                        </div>
                    </form>}
                    {isLoading && <img src={loader} alt='' className='position-absolute top-50 start-50 loader translate-middle' />}
                    {user?.email && <Alert severity="success">User Created successfully!</Alert>}
                    {user?.email && verifyEmail}
                    {authError && <Alert severity="error">{authError.slice(16,limit)}</Alert>}
                </Grid>
                <Grid item sx={{ mt: 8 }} xs={12} md={6}>
                    <img className='w-100' src={RegisterBanner} alt=''></img>
                </Grid>
            </Grid>
            <br/>
            <br/>
        </Container>
    );
};

export default Register;