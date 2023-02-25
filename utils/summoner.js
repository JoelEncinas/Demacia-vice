const fetch = require("node-fetch");

const RIOT_API = "RGAPI-3cc9fd01-e05b-4b57-a098-e805d3595328";
const NOT_FOUND = "Snap! Summoner not found..."

// gather data

const summonerData = async (name, callback) => {
  const puuid = await fetchSummoner(name);
  if (puuid === "not found") {
    callback(NOT_FOUND, undefined);
  } else {
    const matchHistory = await fetchMatchHistory(puuid);
    if (matchHistory === "not found") {
      callback(NOT_FOUND, undefined);
    } else {
      const pings = await fetchPings(puuid, matchHistory);
      if (pings === "not found") {
        callback(NOT_FOUND, undefined);
      } else {
        console.log(pings);
        callback(undefined, pings); 
      }
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
      "X-Riot-Token": RIOT_API
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
  const SEARCH_MATCH_HISTORY = `https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=1`;

  return fetch(SEARCH_MATCH_HISTORY, {
    method: "GET",
    headers: {
      "X-Riot-Token": RIOT_API,
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

function fetchPings(puuid, matchHistory) {
  const SEARCH_MATCH = `https://europe.api.riotgames.com/lol/match/v5/matches/${matchHistory[0]}`;

  return fetch(SEARCH_MATCH, {
    method: "GET",
    headers: {
      "X-Riot-Token": RIOT_API,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.status) {
        return "not found";
      } else {
        let summoner = 0;

        data.metadata.participants.map((participant, index) => {
          if (participant === puuid) {
            summoner = index;
          }
          var index = index + 1;
        });

        let pings = {
          allInPings: data.info.participants[summoner].allInPings,
          assistMePings: data.info.participants[summoner].allInPings,
          baitPings: data.info.participants[summoner].baitPings,
          basicPings: data.info.participants[summoner].basicPings,
          commandPings: data.info.participants[summoner].commandPings,
          dangerPings: data.info.participants[summoner].dangerPings,
          enemyMissingPings: data.info.participants[summoner].enemyMissingPings,
          enemyVisionPings: data.info.participants[summoner].enemyVisionPings,
          getBackPings: data.info.participants[summoner].getBackPings,
          holdPings: data.info.participants[summoner].holdPings,
          needVisionPings: data.info.participants[summoner].needVisionPings,
          onMyWayPings: data.info.participants[summoner].onMyWayPings,
          pushPings: data.info.participants[summoner].pushPings
        };

        return pings;
      }
    })
    .catch((error) => {
      return error;
    });
}

module.exports = summonerData;
