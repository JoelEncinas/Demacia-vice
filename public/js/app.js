let fetchSummoner = "/summoner";

const summonerForm = document.getElementById("summoner-form");
const summonerFormInput = document.getElementById("summoner-form-input");
const summonerData = document.getElementById("summoner-data");
const pingsData = document.getElementById("pings-data");
const summonerInfo = document.getElementById("summoner-info");

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

// ping tooltips
const pingTooltips = [
  "All in",
  "Assist me",
  "Bait",
  "Basic",
  "Focus objective",
  "Danger",
  "Enemy missing",
  "Enemy has vision",
  "Get Back",
  "Hold",
  "Need vision",
  "On my way",
  "Push",
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

// badges
const quietBadge = document.getElementById("quiet-badge");
const chillBadge = document.getElementById("chill-badge");
const cautiousBadge = document.getElementById("cautious-badge");
const visionBadge = document.getElementById("vision-badge");
const leaderBadge = document.getElementById("leader-badge");
const helpfulBadge = document.getElementById("helpful-badge");
const communicativeBadge = document.getElementById("communicative-badge");
const angryBadge = document.getElementById("angry-badge");
const toxicBadge = document.getElementById("toxic-badge");

// display data
summonerForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const apiUrl = fetchSummoner + "?name=" + summonerFormInput.value;

  // hide badges
  quietBadge.classList.add("d-none");
  chillBadge.classList.add("d-none");
  cautiousBadge.classList.add("d-none");
  visionBadge.classList.add("d-none");
  leaderBadge.classList.add("d-none");
  helpfulBadge.classList.add("d-none");
  communicativeBadge.classList.add("d-none");
  angryBadge.classList.add("d-none");
  toxicBadge.classList.add("d-none");

  summonerData.classList.remove("d-none");
  summonerData.textContent = "Loading...";
  pingsData.classList.add("d-none");
  summonerInfo.classList.add("d-none")

  fetch(apiUrl).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        summonerData.textContent = data.error;
      } else {
        summonerData.classList.add("d-none");
        summonerInfo.classList.remove("d-none")
        pingsData.classList.remove("d-none");
        pingsData.classList.add("d-block");

        // badges
        let totalPings = 0;
        for (let ping in data.pings) {
          totalPings += data.pings[ping];
        }

        if (totalPings <= 10) {
          quietBadge.classList.remove("d-none");
        }

        if (totalPings > 10 && totalPings < 50) {
          chillBadge.classList.remove("d-none");
        }

        if (totalPings >= 50 && totalPings < 150) {
          communicativeBadge.classList.remove("d-none");
        }

        if (totalPings >= 150) {
          angryBadge.classList.remove("d-none");
        }

        if (data.pings.commandPings >= 15) {
          leaderBadge.classList.remove("d-none");
        }

        if (data.pings.enemyMissingPings >= 15) {
          cautiousBadge.classList.remove("d-none");
        }

        if (data.pings.onMyWayPings >= 15) {
          helpfulBadge.classList.remove("d-none");
        }

        if (data.pings.enemyVisionPings >= 3 || data.needVisionPings >= 3) {
          visionBadge.classList.remove("d-none");
        }

        if (data.pings.baitPings >= 5) {
          toxicBadge.classList.remove("d-none");
        }

        // summoner info
        summonerInfo.innerHTML = `
        <p>${data.info.name} <span class="level text-secondary">&nbsp;&nbsp;Lv ${data.info.level}</span></p>
        <p>${data.info.lane} <span class="level text-secondary">&nbsp;&nbsp;${data.info.champion}</span></p>
        `;

        let i = 0;
        const maxPings = Math.max(...Object.values(data.pings));

        pingElements.forEach((pingElement) => {
          pingElement.classList.add("d-list-item");

          // bars
          let barColor = "";
          switch (true) {
            case data.pings[pingNames[i]] >= 0 && data.pings[pingNames[i]] <= 10:
              barColor = "bg-success";
              break;
            case data.pings[pingNames[i]] >= 11 && data.pings[pingNames[i]] <= 20:
              barColor = "bg-warning";
              break;
            case data.pings[pingNames[i]] >= 21:
              barColor = "bg-danger";
              break;
            default:
              barColor = "bg-success";
          }

          pingElement.innerHTML = `
          <div class="progress">
            <img class="ping-image" src="img/${pingNames[i]}.png" alt="ping" 
            data-toggle="tooltip" data-placement="top"
            title="${pingTooltips[i]}"> 
            <div 
              class="progress-bar ${barColor}" 
              role="progressbar" 
              style="width: ${(data.pings[pingNames[i]] / maxPings) * 100}%;" 
              aria-valuenow="${data.pings[pingNames[i]]}" 
              aria-valuemin="0" 
              aria-valuemax="${maxPings}">
            </div>
            <span class="ping-tooltip">${data.pings[pingNames[i]]}</span>
          </div>
          `;
          i++;
        });
      }
    });
  });
});