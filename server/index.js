const express = require('express');
const cors = require('cors');
const sgMail = require('@sendgrid/mail');
var config = require('./config');
var http = require('https');

const app = express();
var apiKey = config.mailKey;

app.use(cors());

// Welcome page of the express server: 
app.get('/', (req, res) => {
    res.send("Welcome to the Sendgrid Emailing Server"); 
});

app.get('/send-email', (req,res) => {
    //Get Variables from query string in the search bar
    const { recipient, topic, text, img, token } = req.query; 
    var url1 = img.substr(0,78).concat("%2F");
    var url2 = img.substr(79);
    var imgUrl = url1.concat(url2, "&token=", token);
    console.log(imgUrl);
    console.log("to: " + recipient);
    
    var options = {
        "method": "POST",
        "hostname": "api.sendgrid.com",
        "port": null,
        "path": "/v3/mail/send",
        "headers": {
          "authorization": "Bearer " + apiKey,
          "content-type": "application/json"
        }
      };
      
      var req = http.request(options, function (res) {
        var chunks = [];
      
        res.on("data", function (chunk) {
          chunks.push(chunk);
        });
      
        res.on("end", function () {
          var body = Buffer.concat(chunks);
          console.log(body.toString());
        });
      });
      
      req.write(JSON.stringify({ personalizations: 
         [ { to: [ { email: recipient } ],
            subject: topic } ],
            from: { email: 'marinesm96@gmail.com', name: 'Petinder' },
        content: 
         [ { type: 'text/html',
             value: "<header>"+ text +"</header><img src=\'" + imgUrl + "\'/>" } ] }));
        
      req.end();

});

// to access server run 'nodemon index.js' then click here: http://localhost:4000/
app.listen(4000, () => console.log("Running on Port 4000")); 