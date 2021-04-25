const express = require('express');
const request = require('request');
const bodyParser = require("body-parser");
const app = express();

var cors = require('cors');
var PORT = process.env.PORT || 3000;         // it is a google's demand - port can be changed by App Engine

app.options('*', cors());
app.use(cors());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

//parse requests of content-type application/json
app.use(bodyParser.json());

app.use(express.static(__dirname + "/flikr-job-test"));

app.post('/get_token', function(req, res){
  var url = "https://raindrop.io/oauth/access_token";
  const params = {
    method: 'POST',
    url: url,
    json: true,
    body: req.body,
    headers: {"Content-type": "application/json"}
  };
  request(params, (err, resp, body) => {
    console.log(resp.statusCode);
    if (err || resp.statusCode !== 200) {
      return res.status(500).json({ type: 'error', message: err });
    }
    res.send(body);
  });
});


/*
app.get('/jokes/random', (req, res) => {
  request(
    { url: 'https://joke-api-strict-cors.appspot.com/jokes/random' },
    (error, response, body) => {
      if (error || response.statusCode !== 200) {
        return res.status(500).json({ type: 'error', message: err.message });
      }

      res.json(JSON.parse(body));
    }
  )
});
*/



















app.get('*', function(req, res){
  res.sendFile(__dirname + "/flikr-job-test/index.html");
});

app.listen(PORT, function(){               
    console.log('Your Image Finder server is listening on port ' + PORT);
});

