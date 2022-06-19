import { useRef, useState, useEffect } from 'react';
import {
  Button,
  Typography,
  FormControl,
  FormControlLabel,
  Input,
  InputLabel,
  InputAdornment,
  Checkbox,
  Grid,
  Paper,
  Avatar,
  IconButton,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { signIn_signUp } from '../../store';
import getGoogleOAuthURL from './getGoogleUrl';

//import Link from '@mui/material/Link';
// or
import { Link } from '@mui/material';

const paperStyle = {
  padding: 20,
  height: 'auto',
  width: 380,
  margin: '20px auto',
};

const Login = () => {
  const userRef = useRef();
  const errRef = useRef();
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);
  const [signUp, setSignUp] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setError('');
  }, [username, pwd]);

  const handleSubmit = async (e) => {
    const payload = { username, pwd, signUp, firstName, lastName };
    console.log(payload);
    e.preventDefault();

    const data = await dispatch(signIn_signUp(payload));
    if (data) {
      console.log('you have data');
    } else if (!data && signUp) {
      console.log('you dont have data');
      setError('PICK ANOTHER USERNAME');
    } else if (data === null && !signUp) {
      setError('BAD PASSWORD AND OR USERNAME');
    }
  };

  const handleSignButton = () => {
    setSignUp(!signUp);
  };

  return (
    <>
      {success ? (
        <section>
          <h1>You are logged in!</h1>
          <br />
          <p>
            <a href='#'>Go to Home</a>
          </p>
        </section>
      ) : (
        <Grid>
          <Paper elevation={10} style={paperStyle}>
            <section>
              <p
                ref={errRef}
                className={errMsg ? 'errmsg' : 'offscreen'}
                aria-live='assertive'
              >
                {errMsg}
              </p>

              {signUp ? <h2>Please Fill Out Form</h2> : <h2>Sign In</h2>}
              <form onSubmit={handleSubmit}>
                {signUp ? (
                  <>
                    <FormControl
                      variant='standard'
                      className='textfield'
                      sx={{ margin: '8px' }}
                      fullWidth
                      required
                    >
                      <InputLabel htmlFor='firstName'>First Name</InputLabel>
                      <Input
                        type='text'
                        id='firstName'
                        ref={userRef}
                        autoComplete='off'
                        onChange={(e) => setFirstName(e.target.value)}
                        value={firstName}
                        required
                      />
                    </FormControl>{' '}
                    <FormControl
                      variant='standard'
                      className='textfield'
                      sx={{ margin: '8px' }}
                      fullWidth
                      required
                    >
                      <InputLabel htmlFor='lastName'>Last Name</InputLabel>
                      <Input
                        type='text'
                        id='lastName'
                        ref={userRef}
                        autoComplete='off'
                        onChange={(e) => setLastName(e.target.value)}
                        value={lastName}
                        required
                      />
                    </FormControl>
                  </>
                ) : (
                  ''
                )}

                <FormControl
                  variant='standard'
                  className='textfield'
                  sx={{ margin: '8px' }}
                  fullWidth
                  required
                >
                  <InputLabel htmlFor='username'>Username</InputLabel>
                  <Input
                    type='text'
                    id='username'
                    ref={userRef}
                    autoComplete='off'
                    onChange={(e) => setUser(e.target.value)}
                    value={username}
                    required
                  />
                </FormControl>
                <FormControl
                  variant='standard'
                  className='textfield'
                  sx={{ margin: '8px' }}
                  fullWidth
                  required
                >
                  <InputLabel htmlFor='password'>Password</InputLabel>
                  <Input
                    type='password'
                    id='password'
                    onChange={(e) => setPwd(e.target.value)}
                    value={pwd}
                    required
                  />
                </FormControl>
                <Button
                  variant='contained'
                  sx={{
                    margin: '0',
                    padding: '0',
                    backgroundColor: 'mediumblue',
                    fontWeight: '600',
                  }}
                  type='submit'
                  fullWidth
                >
                  {signUp ? <p>Sign Up</p> : <p>Sign In</p>}
                </Button>
              </form>
              {error ? <p>{error}</p> : ''}
              <div>
                <span className='line'>
                  {/*put router link here*/}

                  <Button onClick={() => handleSignButton()}>
                    {signUp ? <p>Sign In</p> : <p>Sign Up</p>}
                  </Button>
                  <Button href={getGoogleOAuthURL()}>
                    {signUp ? <p>Google Login</p> : <p>Google Sign Up</p>}
                  </Button>
                </span>
              </div>
            </section>
          </Paper>
        </Grid>
      )}
    </>
  );
};

export default Login;
