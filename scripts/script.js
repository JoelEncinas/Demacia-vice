$(document).ready(() => {
    API_KEY = process.env.RIOT;

    URI = `https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/agurin`

    // Request with custom header
    $.ajax({
        url: URI,
        headers: { "X-Riot-Token": "RGAPI-b5c9a3a3-2c02-4119-9057-511fec206b1e" },
        data: JSON.stringify(data),
        contentType: 'application/json',
        async: false,
        success: function (response) {
            console.log(response)
        }
    })
})