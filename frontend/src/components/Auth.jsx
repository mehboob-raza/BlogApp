import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import LoginIcon from '@mui/icons-material/Login';
import axios from 'axios'
import {useDispatch} from 'react-redux'
import { login } from '../store/AuthSlice';
import {useNavigate} from 'react-router-dom'
// import auth from '../store/store.js'

export default function Auth() {
  const [isSignup, setIsSignup] = React.useState(false)
  const [inputs, setInputs] = React.useState({
    name: '',
    email: '',
    password: ''
  })

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(inputs);
    if (isSignup) {
      sendRequest('signup').then((data) => localStorage.setItem("userId", data.user._id))
        .then(() => dispatch(login()))
        .then(() => navigate('/blogs'))
        .then(data => console.log(data))
    }
    else {
      sendRequest().then((data) => localStorage.setItem("userId", data.user._id))
        .then(() => dispatch(login()))
        .then(() => navigate('/blogs'))
        .then(data => console.log(data))
    }

  };

  const sendRequest = async(type='login') => {
    const res = await axios.post(`http://localhost:5000/api/user/${type}`, {
      name: inputs.name,
      email: inputs.email,
      password: inputs.password
    }).catch(err => console.log(err))

    const data = await res.data
    return data
  }

  const handleChane = (e) => {
    setInputs((prev) => ({
      ...prev, 
      [e.target.name] : e.target.value
    }))
  }

  return (
   
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            {isSignup ? <LockOutlinedIcon /> : <LoginIcon />}
          </Avatar>
          <Typography component="h1" variant="h5">
            {isSignup ? "Sign up" :"Login"}
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              {isSignup && <Grid item xs={12}>
                <TextField onChange={handleChane}
                  autoComplete="given-name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                label="Name"
                value={inputs.name}
                  autoFocus
                />
              </Grid>}
              
              <Grid item xs={12}>
                <TextField onChange={handleChane}
                  required
                  fullWidth
                  id="email"
                  label="Email"
                name="email"
                type='email'
                value={inputs.email}
                
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField onChange={handleChane}
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                id="password"
                value={inputs.password}
                
                  autoComplete="new-password"
                />
              </Grid>
              
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {isSignup?"Sign Up" : "Login"}
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2" onClick= {() => setIsSignup(!isSignup)}>
                  {isSignup ?  "Already have an account? Signin" : "Don't have account? Sign up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        
      </Container>
  
  );
}