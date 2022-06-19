const getGoogleOAuthURL = () => {
  const redirect_uri = 'http://localhost:8080/api/oauth/google';
  const client_id =
    '465880391826-p5rng7uf6tmp7jaklunmoq2cc983c1ap.apps.googleusercontent.com';
  const rootUrl = 'https://accounts.google.com/o/oauth2/v2/auth';

  const options = {
    redirect_uri,
    client_id,
    access_type: 'offline',
    response_type: 'code',
    prompt: 'consent',
    scope: [
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile',
    ].join(' '),
  };

  const qs = new URLSearchParams(options);
  //console.log(qs);
  //console.log(qs.toString());
  //console.log(`${rootUrl}?${qs.toString()}`);
  //console.log({ options });
  return `${rootUrl}?${qs.toString()}`;
};

export default getGoogleOAuthURL;
