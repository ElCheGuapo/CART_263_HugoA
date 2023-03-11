const bodyParser = require("body-parser");
const express = require("express");

var socket = require('socket.io');

const request = require("request");

const port = 3000;
var URLExtension = 'players/topscorers'

const app = express();

const cors=require("cors");
const { send } = require("express/lib/response");
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions)) // Use this after the variable declaration

//just some arrays
var stats = [];
var playerStats = [];

var server = app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})

var io = require('socket.io')(server);

app.use(express.static('public'));

//do the hosting thing
app.get('/', async (req, res) => {
  res.render('public/index.html');
});


//what settings are we using to pull data
const options = {
  method: 'GET',
  url: 'https://v3.football.api-sports.io/' + URLExtension,
  qs: {season: 2022, league: 1},
  headers: {
    'x-rapidapi-host': 'v3.football.api-sports.io',
    'x-rapidapi-key': 'f14d3c4007394505c416abc8d763b2fc'
  }
};

//use bodyParser to make data more readable/easier to use
app.use(bodyParser.json());

async function getData() {
  //request + pull data from api
  request(options, function (error, response, body) {
    if (error) throw new Error(error);
  //clear array so it can be reused
    stats = [];

    //turn body into something more usable
    var as = JSON.parse(body);

  //pull top 15 player stats
    for (var i = 0; i < 15; i++) {
  //cherry pick which stats I want to mess around with 
      playerStats.push(as.response[i].player.name);
      playerStats.push(as.response[i].player.age);
      playerStats.push(as.response[i].statistics[0].team);
      playerStats.push(as.response[i].player.nationality);
      playerStats.push(as.response[i].statistics[0].goals);
      
      stats.push(playerStats);
      playerStats = [];
      
    }
    stats.push(as.response[0].statistics[0].league.season);
    stats.push(as.response[0].statistics[0].league.id);
    console.log("sending " + as.response[0].statistics[0].league.season);
    console.log("________end_______");
    
  //emit data to front end
    io.emit("stats", stats);

  });
}

// server-side
io.on('connection', (socket) => {
  console.log(socket.id);

  socket.on('params', (data) => {
  //Modify Params
    URLExtension = data.extension;

    options.qs.season = data.year;

    options.qs.league = data.id;

    getData();
  })
});






//_______________________
//function dump bellow :)
//_______________________

// io.on('params', (socket) => {
//   console.log(socket);
//   console.log(socket.extension);
//   URLExtension = socket.extension;


//   options.qs.season = socket.year;

//   options.qs.league = socket.id;

//   getData();

// });




// io.on('sendStats', (socket) => {
//   socket.emit('stats', stats);
// });

// io.on('params', (socket) => {
//   console.log(socket);
// })

