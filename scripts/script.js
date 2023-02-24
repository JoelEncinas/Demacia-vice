import { RIOT } from '/api';

$(document).ready(() => {
    API_KEY = RIOT;

    URI = `https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/agurin`

    // Request with custom header
    $.ajax({
        url: URI,
        headers: { "X-Riot-Token": API_KEY },
        data: JSON.stringify(data),
        contentType: 'application/json',
        async: false,
        success: function (response) {
            console.log(response)
        }
    })
})