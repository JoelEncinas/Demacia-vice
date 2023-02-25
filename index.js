const express = require("express");
const app = express();
const port = 5500;
const cors = require("cors");
const hsb = require("hbs");
const summonerData = require("./utils/summoner");

// middleware
app.use(cors());
app.use(express.static("public"));

app.set("view engine", "hbs");
app.set("views", __dirname + "/views");
hsb.registerPartials(__dirname + "/partials");

// routes
app.get("/", (req, res) => {
  res.render("index", {
    title: "Ping Metter",
  });
});

app.get("/summoner", (req, res) => {
  const summoner = req.query.name;

  if (!summoner) {
    return res.send({ error: "Enter summoner name!" });
  }

  summonerData(summoner, (error, result) => {
    if (error) {
      return res.send({
        error,
      });
    }

    res.send(result);
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    error: "404",
    title: "Page not found",
  });
});

app.listen(port, () => {
  console.log(`Success! Your application is running on port ${port}.`);
});
