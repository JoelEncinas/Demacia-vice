const express = require("express");
const app = express();
const port = 5500;
const cors = require("cors");
const fetch = require("node-fetch");

// middleware
app.use(cors());

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/summoner", (req, res) => {
  res.send("Pings end point");
});

app.get("/about", (req, res) => {
  res.send("about end point");
});

app.get("*", (req, res) => {
  res.send("404 Page not found");
});

let name = "agurin";
const SEARCH_USERNAME = `https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${name}`;

fetch(SEARCH_USERNAME, {
  method: "GET",
  headers: {
    "X-Riot-Token": "RGAPI-b5c9a3a3-2c02-4119-9057-511fec206b1e",
  },
})
  .then((response) => response.json())
  .then((data) => {
    //console.log("Success:", data);
  })
  .catch((error) => {
    console.error("Error:", error);
  });

app.listen(port, () => {
  console.log(`Success! Your application is running on port ${port}.`);
});
