### TODO

- en los arrays que tienes declaradas las strings normalmente se declaran con enums en typescript y en objetos en javascript (porque no tiene enums nativos)
- Se suele hacer algo asi
    const pingTooltips = Object.freeze({
        AllInPings: "allInPings",
    })
- luego, he visto que tienes bastantes comments documentado el codigo tipo: // hide badges - en vez de hacer eso estaria mas nice que eso fuera una funcion hideBadges();
- if (data.pings.commandPings >= 15) {
          leaderBadge.classList.remove("d-none");
        }

        if (data.pings.enemyMissingPings >= 15) {
          cautiousBadge.classList.remove("d-none");
        }

        if (data.pings.onMyWayPings >= 15) {
          helpfulBadge.classList.remove("d-none");
        }
- const NOT_FOUND = "Snap! Summoner not found...";
- const MATCH_NOT_FOUND = "Snap! Summoner not found...";
- La funcion de summonerData puede quedarse bastante clean si en vez de hacer nested if/else statements usas returns despues de cada statement, algo asi:
- const summonerData = async (name, callback) => {
  const puuid = await fetchSummoner(name);
  if (puuid === "not found") {
    callback(NOT_FOUND);
    return;
  } 
  const matchHistory = await fetchMatchHistory(puuid);
  if (matchHistory === "match not found") {
    callback(MATCH_NOT_FOUND);
    return;
  } 
  const pings = await fetchPings(puuid, matchHistory);
  if (pings === "not found") {
    callback(MATCH_NOT_FOUND);
    return;
  }
  callback(null, pings);
};
- en los que el segundo param pasas undefined o nulll puedes no pasarlo directamente: callback(MATCH_NOT_FOUND);
- data.metadata.participants.map((participant, index) => {
          if (participant === puuid) {
            summoner = index;
          }
          var index = index + 1;
        });
