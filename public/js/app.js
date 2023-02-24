let fetchSummoner = "/summoner";

const summonerForm = document.getElementById("summoner-form");
const summonerFormInput = document.getElementById("summoner-form-input");
const summonerData = document.getElementById("summoner-data");

// display data
summonerForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const apiUrl = fetchSummoner + "?name=" + summonerFormInput.value;
  summonerFormInput.value = "";
  summonerData.textContent = "";
  fetch(apiUrl).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        summonerData.textContent = data.error;
      } else {
        summonerData.textContent = data.id;
      }
    });
  });
});
