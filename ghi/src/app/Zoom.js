var request = require('request');

var options = {
  method: 'POST',
  url: 'https://zoom.us/oauth/token',
  qs: {
    grant_type: 'authorization_code',
    //The code below is a sample Authorization Code. Replace it with your actual Authorization Code while making requests.
    code: 'B1234558uQ',
    //The uri below is a sample redirect_uri. Replace it with your actual redirect_uri while making requests.
    redirect_uri: 'http://localhost:5173/',
  },
  headers: {
    /**The credential below is a sample base64 encoded credential. Replace it with "Authorization: 'Basic ' + Buffer.from(your_app_client_id + ':' + your_app_client_secret).toString('base64')"
     **/
    Authorization: 'Basic ' + Buffer.from('OAwVjWjqQIGaSCrCpzprAw' + ':' + 'L7NJbej3HQUJuJTuKXexq7AulrRyUX0h').toString('base64'),
  },
};

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
