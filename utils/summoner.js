const fetch = require("node-fetch");

// gather data

let name = "";
let puuid = "";
const SEARCH_USERNAME =
  "https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/";
const SEARCH_MATCH_HISTORY =
  `https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=15`;

const summonerData = (name, callback) => {
  const url = SEARCH_USERNAME + encodeURIComponent(name);
  let id = "";
  fetch(url, {
    method: "GET",
    headers: {
      "X-Riot-Token": "RGAPI-b5c9a3a3-2c02-4119-9057-511fec206b1e",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.id == undefined) {
        callback("Summoner not found!", undefined);
      } else {
        console.log(data);
        id = data.id;
        callback(undefined, { id: id });
      }
    })
    .catch((error) => {
      callback({ error: error });
    });
};

// get summoner id
// get match history
// get all pings data
// callback with all data
// display data in app.js static

function fetchSummoner(name){
    fetch(url, {
        method: "GET",
        headers: {
          "X-Riot-Token": "RGAPI-b5c9a3a3-2c02-4119-9057-511fec206b1e",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.id == undefined) {
            callback("Summoner not found!", undefined);
          } else {
            console.log(data);
            id = data.id;
            callback(undefined, { id: id });
          }
        })
        .catch((error) => {
          callback({ error: error });
        });
}

module.exports = summonerData;
