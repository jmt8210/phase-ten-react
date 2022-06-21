import Header from './Header'
import { TextField, Button } from '@mui/material'
import { useDispatch } from 'react-redux'
// import { useSelector } from 'react-redux'
import { changeCurrentUser } from './reducers'
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
// import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import { useNavigate } from "react-router-dom";

function Login(){

  const navigate = useNavigate();

  // const currentUser = useSelector(state => state.currentUser);
  const dispatch = useDispatch();
  var username = '';
  var password = '';

  function updateUsername(event){
    if(event && event.target){
      username = event.target.value;
    }
  }

  function updatePassword(event){
    if(event && event.target){
      password = event.target.value;
    }
  }

  function changeUser(){
    console.log("CHECK");
    if(login(username, password)){
      console.log("CORRECT");
      dispatch(changeCurrentUser(username));
      navigate("/");
    }else{
      console.log("NOT");
    }
  }

  async function login(user, pass){
    var body = {
      username: user,
      password: pass
    }
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    };
    var check = await fetch('http://localhost:5001/user/login', options, (res, err) => {
      if(err){
        // Properly log error
        return false;
      }

      if (res.status === 200) return true;

      return false;

    })
    return check;
  }

  function register(){

  }

  return (
    <>
      <Header/>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        // style={{ minHeight: '100vh' }}
      >
        <br/>
        <br/>
        {/* {currentUser} */}
        <br/>
        <Grid item style={{width: "50%"}}>
          <Card>
            <Grid
              container
              spacing={0}
              direction="column"
              // alignItems="center"
              justify="center"
              // style={{ minHeight: '100vh' }}
            >
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Login
                </Typography>
                <br/>
                <TextField onChange={updateUsername} style={{width: "80%"}} id="username-field" label="Username" variant="outlined" />
                <br/><br/>
                <TextField onChange={updatePassword} style={{width: "80%"}} id="password-field" label="Password" variant="outlined" />
              </CardContent>
              <CardActions>
                <Button onClick={changeUser} size="small">Login</Button>
                <Button onClick={register} size="small">Register</Button>
              </CardActions>
            </Grid>
          </Card>
        </Grid>
        
      </Grid>
      {/* <Button onClick={changeUser} variant="contained">Submit</Button> */}
    </>
  )
}

export default Login;