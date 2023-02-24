const fetch = require("node-fetch");

// gather data

let name = "";
let puuid = "";

const summonerData = async (name, callback) => {
  const puuid = await fetchSummoner(name);
  if (puuid === "not found") {
    callback("not found", undefined);
  } else {
    const matchHistory = await fetchMatchHistory(puuid);
    if (matchHistory === "not found") {
      callback("not found", undefined);
    } else {
        console.log(matchHistory);
        callback(undefined, matchHistory);
    }
  }
};

// get all pings data from every match
// callback with all data
// display data in app.js static

function fetchSummoner(name) {
  const url =
    "https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/";
  const SEARCH_USERNAME = url + encodeURIComponent(name);

  // return promise so it awaits on summonerData
  return fetch(SEARCH_USERNAME, {
    method: "GET",
    headers: {
      "X-Riot-Token": "RGAPI-b5c9a3a3-2c02-4119-9057-511fec206b1e",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.id == undefined) {
        return "not found";
      } else {
        return data.puuid;
      }
    })
    .catch((error) => {
      return error;
    });
}

function fetchMatchHistory(puuid) {
  const SEARCH_MATCH_HISTORY = `https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=15`;

  return fetch(SEARCH_MATCH_HISTORY, {
    method: "GET",
    headers: {
      "X-Riot-Token": "RGAPI-b5c9a3a3-2c02-4119-9057-511fec206b1e",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.status) {
        return "not found";
      } else {
        return data;
      }
    })
    .catch((error) => {
      return error;
    });
}

function fetchMatch(matchHistory) {
    const SEARCH_MATCH = `https://europe.api.riotgames.com/lol/match/v5/matches/`;
  
    // TODO
    return fetch(SEARCH_MATCH_HISTORY, {
      method: "GET",
      headers: {
        "X-Riot-Token": "RGAPI-b5c9a3a3-2c02-4119-9057-511fec206b1e",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status) {
          return "not found";
        } else {
          return data;
        }
      })
      .catch((error) => {
        return error;
      });
  }

module.exports = summonerData;
