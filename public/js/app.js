let fetchSummoner = "/summoner";

const summonerForm = document.getElementById("summoner-form");
const summonerFormInput = document.getElementById("summoner-form-input");

summonerForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const apiUrl = fetchSummoner + "?name=" + summonerFormInput.value;
  summonerFormInput.value = "";
  fetch(apiUrl).then((response) => {
    if (response.error) {
      console.log(response.error);
    } else {
      console.log(response);
    }
  });
});
