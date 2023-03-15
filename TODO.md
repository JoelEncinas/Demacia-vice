### TODO
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
