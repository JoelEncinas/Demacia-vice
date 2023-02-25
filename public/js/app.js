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
  "pushPings",
];

// pings
const allInPings = document.getElementById(pingNames[0]);
const assistMePings = document.getElementById(pingNames[1]);
const baitPings = document.getElementById(pingNames[2]);
const basicPings = document.getElementById(pingNames[3]);
const commandPings = document.getElementById(pingNames[4]);
const dangerPings = document.getElementById(pingNames[5]);
const enemyMissingPings = document.getElementById(pingNames[6]);
const enemyVisionPings = document.getElementById(pingNames[7]);
const getBackPings = document.getElementById(pingNames[8]);
const holdPings = document.getElementById(pingNames[9]);
const needVisionPings = document.getElementById(pingNames[10]);
const onMyWayPings = document.getElementById(pingNames[11]);
const pushPings = document.getElementById(pingNames[12]);

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
  pushPings,
];

// display data
summonerForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const apiUrl = fetchSummoner + "?name=" + summonerFormInput.value;
  summonerData.classList.remove("d-none");
  summonerData.textContent = "Loading...";
  pingsData.classList.add("d-none");

  fetch(apiUrl).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        summonerData.textContent = data.error;
      } else {
        summonerData.classList.add("d-none");
        pingsData.classList.remove("d-none");
        pingsData.classList.add("d-block");
        let i = 0;
        const maxPings = Math.max(...Object.values(data));
        pingElements.forEach((pingElement) => {
          pingElement.classList.add("d-list-item");

          let barColor = "";
          switch (true) {
            case data[pingNames[i]] >= 0 && data[pingNames[i]] <= 5:
              barColor = "bg-success";
              break;
            case data[pingNames[i]] >= 6 && data[pingNames[i]] <= 10:
              barColor = "bg-info";
              break;
            case data[pingNames[i]] >= 11 && data[pingNames[i]] <= 20:
              barColor = "bg-warning";
              break;
            case data[pingNames[i]] >= 21:
              barColor = "bg-danger";
              break;
            default:
              barColor = "bg-success";
          }

          pingElement.innerHTML = `
          <div class="progress">
            <img class="ping-image" src="img/${pingNames[i]}.png" alt="ping"> 
            <div 
              class="progress-bar ${barColor}" 
              role="progressbar" 
              style="width: ${(data[pingNames[i]] / maxPings) * 100}%;" 
              aria-valuenow="${data[pingNames[i]]}" 
              aria-valuemin="0" 
              aria-valuemax="${maxPings}">
            </div>
            <span class="ping-tooltip">${data[pingNames[i]]}</span>
          </div>
          `;
          i++;
        });
      }
    });
  });
});
