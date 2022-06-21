const express = require('express')
const dotenv = require('dotenv')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const bodyParser = require('body-parser')
const cors = require('cors');
const { Client } = require('pg')

const saltRounds = 10;

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(cors());

const client = new Client({
  host: process.env.PG_HOST,
  database: process.env.PG_DB,
  password: process.env.PG_PASS,
  port: process.env.PG_PORT,
})
client.connect()

let PORT = process.env.PORT || 5001;

app.listen(PORT, () => { console.log(`Server is listening on port ${PORT}`); });

app.post('/user/login', (req, res) => {
  var query = {
    text: 'select password from "user" where username=$1',
    values:[req.body.username] 
  }
  client.query(query, (err, queryRes) => {
    if(err) console.log(err); // Properly log error
    if(queryRes.rowCount == 0){
      res.sendStatus(403);
    }else{
      var hashedPassword = queryRes.rows[0].password;
      bcrypt.compare(req.body.password, hashedPassword, function(err, result) {
        if(err) console.log(err) // Properly log error
        if(result) res.send(genJWT(req.body.username));
        else res.sendStatus(403);
      });
    }
  })
})

app.post('/user/register', (req, res) => {
  var query = {
    text: 'select * from "user" where username=$1',
    values:[req.body.username] 
  }
  client.query(query, (err, queryRes) => {
    if(err) console.log(err); // Properly log error
    if(queryRes.rowCount != 0){
      res.status(409).send("Username already taken");
    }else{
      bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
        if(err) console.log(err) // Properly log error
        query = {
          text: 'insert into "user" values ($1, $2)',
          values:[req.body.username, hash] 
        }
        client.query(query, (err, res) => {
          if(err) console.log(err); // Properly log error
        })
      });
      res.send(genJWT(req.body.username));
    }
  })
})

// TO CHECK WHEN PERFORMING ACTIONS
// if(checkJWT(req.header(process.env.TOKEN_HEADER_KEY))){
//   res.send('Success');
// }else{
//   res.status(401).send('Unable to authenticate');
// }

function genJWT(username){
  let jwtSecretKey = process.env.JWT_SECRET_KEY;
  let data = {
    time: Date(),
    username: username,
  }
  return jwt.sign(data, jwtSecretKey);
}

function checkJWT(token){
  let jwtSecretKey = process.env.JWT_SECRET_KEY;

  try {
    const verified = jwt.verify(token, jwtSecretKey);
    if(verified) return true; 
    else return false;
  } catch(error) {
    return false;
  }
}