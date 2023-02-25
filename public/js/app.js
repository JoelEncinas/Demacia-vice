let fetchSummoner = "/summoner";

const summonerForm = document.getElementById("summoner-form");
const summonerFormInput = document.getElementById("summoner-form-input");
const summonerData = document.getElementById("summoner-data");
const pingsData = document.getElementById("pings-data");

// ping names 
const pingNames = [
  "allInPings",
  "assistMePings",
  "baitPings",
  "basicPings",
  "commandPings",
  "dangerPings",
  "enemyMissingPings",
  "enemyVisionPings",
  "getBackPings",
  "holdPings",
  "needVisionPings",
  "onMyWayPings",
  "pushPings"
];

// pings
const allInPings = document.getElementById("allInPings");
const assistMePings = document.getElementById("assistMePings");
const baitPings = document.getElementById("baitPings");
const basicPings = document.getElementById("basicPings");
const commandPings = document.getElementById("commandPings");
const dangerPings = document.getElementById("dangerPings");
const enemyMissingPings = document.getElementById("enemyMissingPings");
const enemyVisionPings = document.getElementById("enemyVisionPings");
const getBackPings = document.getElementById("getBackPings");
const holdPings = document.getElementById("holdPings");
const needVisionPings = document.getElementById("needVisionPings");
const onMyWayPings = document.getElementById("onMyWayPings");
const pushPings = document.getElementById("pushPings");

const pingElements = [
  allInPings,
  assistMePings,
  baitPings,
  basicPings,
  commandPings,
  dangerPings,
  enemyMissingPings,
  enemyVisionPings,
  getBackPings,
  holdPings,
  needVisionPings,
  onMyWayPings,
  pushPings]

// display data
summonerForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const apiUrl = fetchSummoner + "?name=" + summonerFormInput.value;
  summonerFormInput.value = "";
  summonerData.textContent = "Loading...";

  fetch(apiUrl).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        summonerData.textContent = data.error;
      } else {
        summonerData.textContent = "";
        let i = 0;
        pingElements.forEach((pingElement) => {
          pingElement.classList.add("d-list-item");
          pingElement.classList.remove("d-none");
          pingElement.textContent = pingNames[i] + ": " + data[pingNames[i]];
          i++;
        });
      }
    });
  });
});
