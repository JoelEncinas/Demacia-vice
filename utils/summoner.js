const fetch = require("node-fetch");

let name = "agurin";
const SEARCH_USERNAME =
  "https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/";

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
        id = data.id;
        callback(undefined, {id: id});
      }
    })
    .catch((error) => {
      callback({ error: error });
    });
};

module.exports = summonerData;
