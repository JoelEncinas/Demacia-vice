import { RIOT } from './api.js';

$(document).ready(() => {
    const API_KEY = RIOT;
    let name = "agurin"

    const URL = `https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${name}`

    let data = $('.summoner');

    fetch(URL, {
        headers: {
            'X-Riot-Token': API_KEY,
        },
    })
        .then(response => response.json())
        .catch(error => console.log('Error while fetching:', error))

    data.append("hi");
})