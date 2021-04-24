const express = require('express');
//const bodyParser = require("body-parser");
const app = express();
var cors = require('cors');
var PORT = process.env.PORT || 3000;         // it is a google's demand - port can be changed by App Engine

app.options('*', cors());
app.use(cors());

//parse requests of content-type application/json
//app.use(bodyParser.json());

app.use(express.static(__dirname + "/flikr-job-test"));

app.get('*', function(req, res){
  res.sendFile(__dirname + "/flikr-job-test/index.html");
});

app.listen(PORT, function(){               
    console.log('Your Image Finder server is listening on port ' + PORT);
});

