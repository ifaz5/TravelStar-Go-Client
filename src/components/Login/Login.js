import { Container, Typography, TextField, Alert } from '@mui/material';
import React, { useState } from 'react';
import { Grid } from '@mui/material';
import { NavLink, useLocation, useHistory } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';
import loading from './../../images/loginloading.gif'
import LoginBanner from './../../images/loginbanner.png';
import './Login.css'

const Login = ({limit}) => {
  const [loginData, setLoginData] = useState({});
  const { user, loginUser, signInWithGoogle, isLoading, authError } = useAuth();

  const location = useLocation();
  const history = useHistory();

  const handleOnChange = e => {
    const field = e.target.name;
    const value = e.target.value;
    const newLoginData = { ...loginData };
    newLoginData[field] = value;
    setLoginData(newLoginData);
  }
  const handleLoginSubmit = e => {
    loginUser(loginData.email, user.photoURL, loginData.password, location, history);
    e.preventDefault();
  }

  const handleGoogleSignIn = () => {
    signInWithGoogle(location, history)
  }
  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item sx={{ mt: 8 }} xs={12} md={6} lg={6}>
          <Typography variant="body1" gutterBottom>Login</Typography>
          <form onSubmit={handleLoginSubmit}>
            <TextField
              sx={{ width: '75%', m: 1 }}
              id="standard-search"
              label="Your Email"
              name="email"
              onChange={handleOnChange}
              variant="standard" />
            <TextField
              sx={{ width: '75%', m: 1 }}
              id="standard-basic"
              label="Your Password"
              type="password"
              name="password"
              onChange={handleOnChange}
              variant="standard" />

            <div>
            <button className='Signinbtn me-2 mb-2' sx={{ width: '75%', m: 1 }} type="submit" variant="contained"><i className="fal fa-lock-open"></i> Login</button>
            <NavLink
              style={{ textDecoration: 'none' }}
              to="/register">
              <a href='#register'>New User? Please Register</a>
            </NavLink>
            </div>
            <br/>
            {isLoading && <img src={loading} alt='loading...' className='position-absolute top-50 start-50 loader translate-middle overflow-hidden' />}
            {user?.email && <><Alert sx={{width:'76%'}} severity="success">You account is logged in successfully</Alert><br/></>}
            {authError && <><Alert sx={{width:'76%'}} severity="error">{authError.slice(16,limit)}</Alert> <br/></>}
          </form>
          <div>
          <button onClick={handleGoogleSignIn} className='Signinbtn p-1 bt-2 me-3 d-flex'><img style={{width:'40px',height:'40px'}} className='' src='https://i.ibb.co/fDXP2wb/google.png' alt=''></img><p style={{marginBottom:'-10px'}} className='pt-1'>Sign in with Google</p></button>
          </div>
        </Grid>
        <Grid item sx={{ mt: 8 }} xs={12} md={6} lg={6}>
        <img className='w-100' src={LoginBanner} alt=''></img>
        </Grid>
      </Grid>
      <br/>
      <br/>
      <br/>
    </Container>
  );
};

export default Login;