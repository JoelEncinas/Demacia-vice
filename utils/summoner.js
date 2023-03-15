const fetch = require("node-fetch");

const RIOT_API = "RGAPI-49e80ce6-cb29-420c-8344-2c782f85afb0";
const NOT_FOUND = "Snap! Summoner not found...";
const MATCH_NOT_FOUND = "Snap! Match not found...";

// gather data

const summonerData = async (name, callback) => {
  const puuid = await fetchSummoner(name);
  if (puuid === "not found") {
    callback(NOT_FOUND, undefined);
  } else {
    const matchHistory = await fetchMatchHistory(puuid);
    if (matchHistory === "match not found") {
      callback(MATCH_NOT_FOUND, undefined);
    } else {
      const pings = await fetchPings(puuid, matchHistory);
      if (pings === "not found") {
        callback(MATCH_NOT_FOUND, undefined);
      } else {
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
      "X-Riot-Token": RIOT_API,
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
        return "match not found";
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
        return "match not found";
      } else {
        const summonerIndex = data.metadata.participants.findIndex(participant => participant === puuid);

        let summoner = data.info.participants[summonerIndex];

        let pings = {
          pings: {
            allInPings: summoner.allInPings,
            assistMePings: summoner.assistMePings,
            baitPings: summoner.baitPings,
            basicPings: summoner.basicPings,
            commandPings: summoner.commandPings,
            dangerPings: summoner.dangerPings,
            enemyMissingPings: summoner.enemyMissingPings,
            enemyVisionPings: summoner.enemyVisionPings,
            getBackPings: summoner.getBackPings,
            holdPings: summoner.holdPings,
            needVisionPings: summoner.needVisionPings,
            onMyWayPings: summoner.onMyWayPings,
            pushPings: summoner.pushPings,
          },
          info: {
            name: summoner.summonerName,
            level: summoner.summonerLevel,
            champion: summoner.championName,
            lane: summoner.individualPosition,
          },
        };

        return pings;
      }
    })
    .catch((error) => {
      return error;
    });
}

module.exports = summonerData;
