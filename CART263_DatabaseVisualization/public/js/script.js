"use strict";

let optionSelection = {
  leagueSelected: "null",
  yearSelected: "null",
  extensionSelected: "null"
}

let authenticator = {
  WCstats2022Pulled: false,
  WCstats2018Pulled: false,
  WCstats2014Pulled: false,
  WCstats2010Pulled: false,
  WCallstatsPulled: false,

  WCstats2022Saved: false,
  WCstats2018Saved: false,
  WCstats2014Saved: false,
  WCstats2010Saved: false,

  CLstats2022: false,
  CLstats2021: false,
  CLstats2020: false,
  CLstats2019: false,
  CLstats2018: false,
  CLstats2017: false,
  CLstats2016: false,
  CLstats2015: false,
  CLstats2014: false,
  CLstats2013: false,
  CLstats2012: false,
  CLstats2011: false,
  CLstatsPulled: false,

  CLstats2022Saved: false,
  CLstats2021Saved: false,
  CLstats2020Saved: false,
  CLstats2019Saved: false,
  CLstats2018Saved: false,
  CLstats2017Saved: false,
  CLstats2016Saved: false,
  CLstats2015Saved: false,
  CLstats2014Saved: false,
  CLstats2013Saved: false,
  CLstats2012Saved: false,
  CLstats2011Saved: false,

  dataFetched: false

}

let WCStatsTopScorers2022 = [];
let WCStatsTopScorers2018 = [];
let WCStatsTopScorers2014 = [];
let WCStatsTopScorers2010 = [];

let CLStatsTopScorers2022 = [];
let CLStatsTopScorers2021 = [];
let CLStatsTopScorers2020 = [];
let CLStatsTopScorers2019 = [];
let CLStatsTopScorers2018 = [];
let CLStatsTopScorers2017 = [];
let CLStatsTopScorers2016 = [];
let CLStatsTopScorers2015 = [];
let CLStatsTopScorers2014 = [];
let CLStatsTopScorers2013 = [];
let CLStatsTopScorers2012 = [];
let CLStatsTopScorers2011 = [];

var navbar, canvas, socket, WorldCup2022Check, WorldCup2018Check, WorldCup2014Check, WorldCup2010Check, ChampLeagueCheck2022, ChampLeagueCheck2021, ChampLeagueCheck2020, ChampLeagueCheck2019, ChampLeagueCheck2018, ChampLeagueCheck2017, ChampLeagueCheck2016, ChampLeagueCheck2015, ChampLeagueCheck2014, ChampLeagueCheck2013, ChampLeagueCheck2012, ChampLeagueCheck2011, flag1, flag2, flag3;

let paramsFetch;
let currentDisplay = [];
// let packet = [];
let newPacket;
let displayIsActive;


//___________________________________________________________
//                  SETUP FUNCTION
//___________________________________________________________
function setup() {
//set standard p5 canvas and background
  canvas = createCanvas(windowWidth-15, windowHeight-75);
  //canvas.position(50, 180);
  // navbar = document.getElementById("navbar");
  // navbar.position(0, -20);

  background(255);

//set default params
  paramsFetch = [3]
  paramsFetch = ["players/topscorers", 2022, 1];
  // newPacket = false;
  displayIsActive = false;
  
//Socket io stuff => when recieve socket, exec store in db function
  socket = io.connect('http://localhost:3000');
  socket.on("stats", (stats) => {
    storeInLocalDB(stats);

  });
//initialize dom elements in the html file
  flag1 = document.getElementById("flag1");
  flag2 = document.getElementById("flag2");
  flag3 = document.getElementById("flag3");

//initialize the ui check on HTML
  WorldCup2022Check = document.getElementById('btnControl2022-WC');
  WorldCup2018Check = document.getElementById('btnControl2018-WC');
  WorldCup2014Check = document.getElementById('btnControl2014-WC');
  WorldCup2010Check = document.getElementById('btnControl2010-WC');

  ChampLeagueCheck2022 = document.getElementById('btnControl2022-CL');
  ChampLeagueCheck2021 = document.getElementById('btnControl2021-CL');
  ChampLeagueCheck2020 = document.getElementById('btnControl2020-CL');
  ChampLeagueCheck2019 = document.getElementById('btnControl2019-CL');
  ChampLeagueCheck2018 = document.getElementById('btnControl2018-CL');
  ChampLeagueCheck2017 = document.getElementById('btnControl2017-CL');
  ChampLeagueCheck2016 = document.getElementById('btnControl2016-CL');
  ChampLeagueCheck2015 = document.getElementById('btnControl2015-CL');
  ChampLeagueCheck2014 = document.getElementById('btnControl2014-CL');
  ChampLeagueCheck2013 = document.getElementById('btnControl2013-CL');
  ChampLeagueCheck2012 = document.getElementById('btnControl2012-CL');
  ChampLeagueCheck2011 = document.getElementById('btnControl2011-CL');
}
//__________________end_of_section___________________________




//___________________________________________________________
//              COMUNICATE WITH BACKEND
//___________________________________________________________
function storeInLocalDB(stats) {
  switch(stats[16]) {
    case 1:
      switch(stats[15]) {
        case 2022:
          if(!authenticator.WCstats2022Saved && stats[15] === 2022) {
            WCStatsTopScorers2022 = stats;
            authenticator.WCstats2022Saved = true;
          }
        case 2018:
          if(!authenticator.WCstats2018Saved && stats[15] === 2018) {
            WCStatsTopScorers2018 = stats;
            authenticator.WCstats2018Saved = true;
          }
        case 2014:
          if(!authenticator.WCstats2014Saved && stats[15] === 2014) {
            WCStatsTopScorers2014 = stats;
            authenticator.WCstats2014Saved = true;
          }
        case 2010:
          if(!authenticator.WCstats2010Saved && stats[15] === 2010) {
            WCStatsTopScorers2010 = stats;
            authenticator.WCstats2010Saved = true;
          }
      }
    case 2:
      switch(stats[15]) {
        case 2022:
          if(!authenticator.CLstats2022Saved && stats[15] === 2022) {
            CLStatsTopScorers2022 = stats;
            authenticator.CLstats2022Saved = true;
          }
          
        case 2021:
          if(!authenticator.CLstats2021Saved && stats[15] === 2021) {
            CLStatsTopScorers2021 = stats;
            authenticator.CLstats2021Saved = true;
          }
          
        case 2020:
          if(!authenticator.CLstats2020Saved && stats[15] === 2020) {
            CLStatsTopScorers2020 = stats;
            authenticator.CLstats2020Saved = true;
          }
          
        case 2019:
          if(!authenticator.CLstats2019Saved && stats[15] === 2019) {
            CLStatsTopScorers2019 = stats;
            authenticator.CLstats2019Saved = true;
          }
;
        case 2018:
          if(!authenticator.CLstats2018Saved && stats[15] === 2018) {
            CLStatsTopScorers2018 = stats;
            authenticator.CLstats2018Saved = true;
          }
          
        case 2017:
          if(!authenticator.CLstats2017Saved && stats[15] === 2017) {
            CLStatsTopScorers2017 = stats;
            authenticator.CLstats2017Saved = true;
          }
          
        case 2016:
          if(!authenticator.CLstats2016Saved && stats[15] === 2016) {
            CLStatsTopScorers2016 = stats;
            authenticator.CLstats2016Saved = true;
          }
          
        case 2015:
          if(!authenticator.CLstats2015Saved && stats[15] === 2015) {
            CLStatsTopScorers2015 = stats;
            authenticator.CLstats2015Saved = true;
          }
          
        case 2014:
          if(!authenticator.CLstats2014Saved && stats[15] === 2014) {
            CLStatsTopScorers2014 = stats;
            authenticator.CLstats2014Saved = true;
          }
          
        case 2013:
          if(!authenticator.CLstats2013Saved && stats[15] === 2013) {
            CLStatsTopScorers2013 = stats;
            authenticator.CLstats2013Saved = true;
          }
          
        case 2012:
          if(!authenticator.CLstats2012Saved && stats[15] === 2012) {
            CLStatsTopScorers2012 = stats;
            authenticator.CLstats2012Saved = true;
          }
          
        case 2011:
          if(!authenticator.CLstats2011Saved && stats[15] === 2011) {
            CLStatsTopScorers2011 = stats;
            authenticator.CLstats2011Saved = true;
          }
          
      }
  }
}
function fetchFromList() {
  if(!authenticator.dataFetched) {
    if(!authenticator.WCallstatsPulled) {

      if(!authenticator.WCstats2022Pulled) {
        emitToBackEnd(paramsFetch[0],2022,paramsFetch[2]);
        console.log("retriving wc 2022 data");
        authenticator.WCstats2022Pulled = true;
        console.log("2022 wc data retrieved");
      } else if(!authenticator.WCstats2018Pulled) {
        emitToBackEnd(paramsFetch[0],2018,paramsFetch[2]);
        console.log("retriving wc 2018 data");
        authenticator.WCstats2018Pulled = true;
        console.log("2018 wc data retrieved");
      } else if(!authenticator.WCstats2014Pulled) {
        emitToBackEnd(paramsFetch[0],2014,paramsFetch[2]);
        console.log("retriving wc 2014 data");
        authenticator.WCstats2014Pulled = true;
        console.log("2014 wc data retrieved");
      } else if(!authenticator.WCstats2010Pulled) {
        emitToBackEnd(paramsFetch[0],2010,paramsFetch[2]);
        console.log("retriving wc 2010 data");
        authenticator.WCstats2010Pulled = true;
        console.log("2010 wc data retrieved");
      }

      if(authenticator.WCstats2022Pulled && authenticator.WCstats2018Pulled && authenticator.WCstats2014Pulled && authenticator.WCstats2010Pulled) {
        authenticator.WCallstatsPulled = true;
        console.log("all wc data retrieved");
      }

    }

    if(!authenticator.CLstats2022) {
      emitToBackEnd(paramsFetch[0],2022, 2);
      console.log("retriving cl 2022 data");
      authenticator.CLstats2022 = true;
      console.log("CL 2022 data retrieved");

    } else if(!authenticator.CLstats2021) {
      emitToBackEnd(paramsFetch[0],2021, 2);
      console.log("retriving cl 2021 data");
      authenticator.CLstats2021 = true;
      console.log("CL 2021 data retrieved");

    } else if(!authenticator.CLstats2020) {
      emitToBackEnd(paramsFetch[0],2020, 2);
      console.log("retriving cl 2020 data");
      authenticator.CLstats2020 = true;
      console.log("CL 2020 data retrieved");

    } else if(!authenticator.CLstats2019) {
      emitToBackEnd(paramsFetch[0],2019, 2);
      console.log("retriving cl 2019 data");
      authenticator.CLstats2019 = true;
      console.log("CL 2019 data retrieved");

    } else if(!authenticator.CLstats2018) {
      emitToBackEnd(paramsFetch[0],2018, 2);
      console.log("retriving cl 2018 data");
      authenticator.CLstats2018 = true;
      console.log("CL 2018 data retrieved");

    } else if(!authenticator.CLstats2017) {
      emitToBackEnd(paramsFetch[0],2017, 2);
      console.log("retriving cl 2017 data");
      authenticator.CLstats2017 = true;
      console.log("CL 2017 data retrieved");

    } else if(!authenticator.CLstats2016) {
      emitToBackEnd(paramsFetch[0],2016, 2);
      console.log("retriving cl 2016 data");
      authenticator.CLstats2016 = true;
      console.log("CL 2016 data retrieved");

    } else if(!authenticator.CLstats2015) {
      emitToBackEnd(paramsFetch[0],2015, 2);
      console.log("retriving cl 2015 data");
      authenticator.CLstats2015 = true;
      console.log("CL 2015 data retrieved");

    } else if(!authenticator.CLstats2014) {
      emitToBackEnd(paramsFetch[0],2014, 2);
      console.log("retriving cl 2014 data");
      authenticator.CLstats2014 = true;
      console.log("CL 2014 data retrieved");

    } else if(!authenticator.CLstats2013) {
      emitToBackEnd(paramsFetch[0],2013, 2);
      console.log("retriving cl 2013 data");
      authenticator.CLstats2013 = true;
      console.log("CL 2013 data retrieved");

    } else if(!authenticator.CLstats2012) {
      emitToBackEnd(paramsFetch[0],2012, 2);
      console.log("retriving cl 2012 data");
      authenticator.CLstats2012 = true;
      console.log("CL 2012 data retrieved");

    } else if(!authenticator.CLstats2011) {
      emitToBackEnd(paramsFetch[0],2011, 2);
      console.log("retriving cl 2011 data");
      authenticator.CLstats2011 = true;
      console.log("CL 2011 data retrieved");

    }

    if(authenticator.CLstats2022 && authenticator.CLstats2021 && authenticator.CLstats2020 && authenticator.CLstats2019 && authenticator.CLstats2018 && authenticator.CLstats2017 && authenticator.CLstats2016 && authenticator.CLstats2015 && authenticator.CLstats2014 && authenticator.CLstats2013 && authenticator.CLstats2012 && authenticator.CLstats2011) {
      authenticator.CLstatsPulled = true;
      console.log("all wc data retrieved");
    }

    if(authenticator.WCallstatsPulled && authenticator.CLstatsPulled) {
      authenticator.dataFetched = true;
    }
  }
}

function emitToBackEnd(extension, year, id) {
  var data = {
      extension: extension,
      year: year,
      id: id
  };

  socket.emit("params", data, (response) => {
    console.log(response.status);
  });
}
//__________________end_of_section___________________________




//___________________________________________________________
//         DETERMINE WHICH SEASON AND LEAGUE
//___________________________________________________________
function checkForSelection() {
//___________________________________________________________

//                World Cup Selection
//___________________________________________________________

  if (WorldCup2022Check.checked) { //check for world cup 2022

    optionSelection.leagueSelected = 'World Cup';
    optionSelection.yearSelected = 2022;
    currentDisplay = WCStatsTopScorers2022;
    displayIsActive = true;
    WorldCup2022Check.checked = false;
  
  } else if (WorldCup2018Check.checked) { //check for world cup 2018

    optionSelection.leagueSelected = 'World Cup';
    optionSelection.yearSelected = 2018;
    currentDisplay = WCStatsTopScorers2018;
    displayIsActive = true;
    WorldCup2018Check.checked = false;

  } else if (WorldCup2014Check.checked) { //check for world cup 2014

    optionSelection.leagueSelected = 'World Cup';
    optionSelection.yearSelected = 2014;
    currentDisplay = WCStatsTopScorers2014;
    displayIsActive = true;
    WorldCup2014Check.checked = false;

  } else if (WorldCup2010Check.checked) { //check for world cup 2010

    optionSelection.leagueSelected = 'World Cup';
    optionSelection.yearSelected = 2010;
    currentDisplay = WCStatsTopScorers2010;
    displayIsActive = true;
    WorldCup2010Check.checked = false;

  }
//__________________end_of_section___________________________


//___________________________________________________________

//              Champion's League Selection
//___________________________________________________________
  if (ChampLeagueCheck2022.checked) { //check for Champions League 2022

    optionSelection.leagueSelected = 'Champions League';
    optionSelection.yearSelected = 2022;
    currentDisplay = CLStatsTopScorers2022;
    displayIsActive = true;
    ChampLeagueCheck2022.checked = false;

  } else if (ChampLeagueCheck2021.checked) { //check for Champions League 2021

    optionSelection.leagueSelected = 'Champions League';
    optionSelection.yearSelected = 2021;
    currentDisplay = CLStatsTopScorers2021;
    displayIsActive = true;
    ChampLeagueCheck2021.checked = false;

  } else if (ChampLeagueCheck2020.checked) { //check for Champions League 2020

    optionSelection.leagueSelected = 'Champions League';
    optionSelection.yearSelected = 2020;
    currentDisplay = CLStatsTopScorers2020;
    displayIsActive = true;
    ChampLeagueCheck2020.checked = false;

  } else if (ChampLeagueCheck2019.checked) { //check for Champions League 2019

    optionSelection.leagueSelected = 'Champions League';
    optionSelection.yearSelected = 2019;
    currentDisplay = CLStatsTopScorers2019;
    displayIsActive = true;
    ChampLeagueCheck2019.checked = false;
    
  } else if (ChampLeagueCheck2018.checked) { //check for Champions League 2018

    optionSelection.leagueSelected = 'Champions League';
    optionSelection.yearSelected = 2018;
    currentDisplay = CLStatsTopScorers2018;
    displayIsActive = true;
    ChampLeagueCheck2018.checked = false;

  } else if (ChampLeagueCheck2017.checked) { //check for Champions League 2017

    optionSelection.leagueSelected = 'Champions League';
    optionSelection.yearSelected = 2017;
    currentDisplay = CLStatsTopScorers2017;
    displayIsActive = true;
    ChampLeagueCheck2017.checked = false;

  } else if (ChampLeagueCheck2016.checked) { //check for Champions League 2016

    optionSelection.leagueSelected = 'Champions League';
    optionSelection.yearSelected = 2016;
    currentDisplay = CLStatsTopScorers2016;
    displayIsActive = true;
    ChampLeagueCheck2016.checked = false;

  } else if (ChampLeagueCheck2015.checked) { //check for Champions League 2015

    optionSelection.leagueSelected = 'Champions League';
    optionSelection.yearSelected = 2015;
    currentDisplay = CLStatsTopScorers2015;
    displayIsActive = true;
    ChampLeagueCheck2015.checked = false;
    
  } else if (ChampLeagueCheck2014.checked) { //check for Champions League 2014

    optionSelection.leagueSelected = 'Champions League';
    optionSelection.yearSelected = 2014;
    currentDisplay = CLStatsTopScorers2014;
    displayIsActive = true;
    ChampLeagueCheck2014.checked = false;

  } else if (ChampLeagueCheck2013.checked) { //check for Champions Leaguep 2013

    optionSelection.leagueSelected = 'Champions League';
    optionSelection.yearSelected = 2013;
    currentDisplay = CLStatsTopScorers2013;
    displayIsActive = true;
    ChampLeagueCheck2013.checked = false;

  } else if (ChampLeagueCheck2012.checked) { //check for Champions League 2012

    optionSelection.leagueSelected = 'Champions League';
    optionSelection.yearSelected = 2012;
    currentDisplay = CLStatsTopScorers2012;
    displayIsActive = true;
    ChampLeagueCheck2012.checked = false;

  } else if (ChampLeagueCheck2011.checked) { //check for Champions League 2011

    optionSelection.leagueSelected = 'Champions League';
    optionSelection.yearSelected = 2011;
    currentDisplay = CLStatsTopScorers2011;
    displayIsActive = true;
    ChampLeagueCheck2011.checked = false;
    
  }
//__________________end_of_section___________________________


}
//__________________end_of_section___________________________



//___________________________________________________________
//              HANDLE DATA VISUALIZATION
//___________________________________________________________
function dataVisualization() {
  push();
  textSize(450);
  fill(100);
  text(currentDisplay[15], width/2-225, height/2+175);
  pop();
  
  flag1.src = currentDisplay[0][2].logo;
  flag2.src = currentDisplay[1][2].logo;
  flag3.src = currentDisplay[2][2].logo;
  //console.log(flag1);
  for(var i = 0; i < 3; i++) {
    push();
    textSize(60);
    fill(0);
    text(currentDisplay[i][0], 90, 100 + i*100);
    // text(currentDisplay[i][1], 300, 100 + i*20);
    
    pop();
  }

  for(var i = 3; i < 15; i++) {
    push();
    textSize(20);
    fill(0);
    text(currentDisplay[i][0], 50, 400 + i*20);
    //text(currentDisplay[i][2].name, 250, 400 + i*20);
    //console.log(currentDisplay[i][2].logo);
    //console.log(currentDisplay[i][2][2]);
    //text(currentDisplay[i][1], 300, 50 + i*20);

    pop();
  }

}
//__________________end_of_section___________________________


//___________________________________________________________
//                  MAIN DRAW FUNCTION
//___________________________________________________________
function draw() {
  background(255);
  checkForSelection();
  fetchFromList();

  if(displayIsActive) {
    dataVisualization();
  }

}
//__________________end_of_section___________________________



































//_______________________
//function dump bellow :)
//_______________________

//_______________________
// function SwitchUI() {
//   switch(optionSelection.leagueSelected) {
//     case 'World Cup':
//       let option1 = new ClickableOption(20, 20, 40, 40, "2022");
//       let option2 = new ClickableOption(70, 20, 40, 40, "2018");
//       let option3 = new ClickableOption(120, 20, 40, 40, "2014");
//       let option4 = new ClickableOption(180, 20, 40, 40, "2010");

//       onScreenOptions.push(option1);
//       onScreenOptions.push(option2);
//       onScreenOptions.push(option3);
//       onScreenOptions.push(option4);
//   }
// }
//_______________________

//_______________________
// function mousePressed() {
//   console.log(optionSelection);
//   console.log(onScreenOptions);
// }
//_______________________


//_______________________
  // setInterval(function() {
  //   console.log(WorldCup2010Check.checked);
  //   console.log(WorldCup2014Check.checked);
  //   console.log(WorldCup2018Check.checked);
  //   console.log(WorldCup2022Check.checked);
  // },4500);
//_______________________


//_______________________
  //league selection drop down menu
  // push();

  // selLeague.position(windowWidth/2-125, windowHeight/2);

  // selLeague.option('World Cup');
  // selLeague.option('Champions League');
  // selLeague.option('UEFA Europa League');
  // selLeague.option('Asian Cup');
  // selLeague.option('Copa America');

  // selLeague.selected('World Cup');

  // pop();
//_______________________


//_______________________
// function mySelectEvent() {
//   switch(selLeague.value()) {
//     case 'World Cup':
//        = 1;

//     case 'Champions League':
//       optionSelection.leagueSelected = 2;

//     case 'UEFA Europa League':
//       optionSelection.leagueSelected = 3;

//     case 'Euro Championship':
//       optionSelection.leagueSelected = 4;

//     case 'Africa Cup of Nations':
//       optionSelection.leagueSelected = 6;

//     case 'CAF Champions League':
//       optionSelection.leagueSelected = 12;

//     case 'Asian Cup':
//       optionSelection.leagueSelected = 7;

//     case 'Copa America':
//       optionSelection.leagueSelected = 9;

//     case 'CONMEBOL Sudamericana':
//       optionSelection.leagueSelected = 11;
//   }

//   background(200);
// }
//_______________________
