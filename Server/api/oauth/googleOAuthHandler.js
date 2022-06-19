// const googleOAuthHandler = async (req, res) => {
//   //return 'Hello user';
//   //Response.send('Hello World');
//   res.send('hello world');
// };

const axios = require('axios');

const qs = require('qs');

const googleOAuthHandler = async (req) => {
  //get code from qs
  const code = req.query.code;
  console.log(code);

  //get id and access token with the code
  const url = process.env.GOOGLE_TOKEN_URL;

  const values = {
    code,
    client_id: process.env.GOOGLE_CLIENT_ID,
    client_secret: process.env.GOOGLE_SECRET,
    redirect_uri: process.env.GOOGLE_REDIRECT,
    grant_type: 'authorization_code',
  };

  // const options = {
  //   redirect_uri: process.env.GOOGLE_REDIRECT,
  //   client_id: process.env.GOOGLE_CLIENT_ID,
  //   access_type: 'offline',
  //   response_type: 'code',
  //   prompt: 'consent',
  //   scope: [
  //     'https://www.googleapis.com/auth/userinfo.email',
  //     'https://www.googleapis.com/auth/userinfo.profile',
  //   ].join(' '),
  // };

  // const qs = new URLSearchParams(options);

  try {
    const response = await axios.post(url, qs.stringify(values), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    console.log('This is it');
    console.log(response);
  } catch (error) {
    console.log(error);
  }

  //get user with token

  //upsert the user

  //create a session

  // create access & refresh tokens

  //set cookies

  // redirect back to client

  return 'Hello user';
};

module.exports = googleOAuthHandler;
