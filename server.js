// server.js
// where your node app starts

// init project
const express = require("express");
const app = express();

const cors = require("cors");

app.use(cors());

// we've started you off with Express,
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(request, response) {
  response.sendFile(__dirname + "/views/index.html");
});

app.route("/api/timestamp/:date?").get(function(req, res) {
  var date = null;
  if (req.params.date !== undefined) {
    var unixTimestamp = parseInt(req.params.date * 1);
    if (isNaN(unixTimestamp)) {
      date = new Date(req.params.date);
    } else {
      date = new Date(unixTimestamp);
    }
  } else {
    date = new Date(Date.now());
  }

  var response =
    date == "Invalid Date"
      ? {
          error: "Invalid Date"
        }
      : {
          unix: date.getTime(),
          utc: date.toUTCString()
        };

  res.json(response);
});

// listen for requests :)
const listener = app.listen(process.env.PORT || 3000, function() {
  console.log("Your app is listening on port " + listener.address().port);
});
