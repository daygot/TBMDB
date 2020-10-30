var express = require("express");
var router = express.Router();

const myDB = require("../db/myDB.js");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "TBMDB (The Best Movie Database)" });
});

router.get("/people", async (req, res, next) => {
  try {
    const first_name = req.query.first_name || "";

    const last_name = req.query.last_name || "";

    const people = await myDB.getPeople(first_name, last_name);

    res.render("People", {
      people: people,
      first_name: first_name,
      last_name: last_name,
    });
  } catch (err) {
    next(err);
  }
});

router.post("/people/create", async (req, res, next) => {
  try {
    const person = req.body;
    console.log("create person", person);

    const peopleId = await myDB.insertPerson(person);
    console.log("inserted id", peopleId);

    res.redirect("/people");
  } catch (err) {
    next(err);
  }
});

router.get("/movies", async (req, res, next) => {
  try {
    const title = req.query.title || "";

    const movies = await myDB.getMovies(title);

    const people = await myDB.getPeople("", "");

    const studios = await myDB.getStudios();

    const genres = await myDB.getGenres();

    const countries = await myDB.getCountries();

    const ratings = await myDB.getRatings();

    const languages = await myDB.getLanguages();

    res.render("Movies", {
      movies: movies,
      people: people,
      studios: studios,
      genres: genres,
      countries: countries,
      ratings: ratings,
      languages: languages,
    });
  } catch (err) {
    next(err);
  }
});

router.post("/movies/create", async (req, res, next) => {
  try {
    const movie = req.body;
    console.log("create movie", movie);

    const movieId = await myDB.insertMovie(movie);
    console.log("inserted id", movieId);

    res.redirect("/movies");
  } catch (err) {
    next(err);
  }
});

router.get("/movie_update", async (req, res, next) => {
  try {
    const movie_id = Object.keys(req.query)[0];

    const movie = await myDB.getMovie(movie_id);

    const people = await myDB.getPeople("", "");

    const studios = await myDB.getStudios();

    const genres = await myDB.getGenres();

    const countries = await myDB.getCountries();

    const ratings = await myDB.getRatings();

    const languages = await myDB.getLanguages();

    res.render("movie_update", {
      movie_id: movie_id,
      movie: movie,
      people: people,
      studios: studios,
      genres: genres,
      countries: countries,
      ratings: ratings,
      languages: languages,
    });
  } catch (err) {
    next(err);
  }
});

router.post("/movie_update/post", async (req, res, next) => {
  try {
    const movie = req.body;
    console.log("update movie", movie);

    const movieId = await myDB.updateMovie(movie);
    console.log("updated id", movieId);

    res.redirect("/movies");
  } catch (err) {
    next(err);
  }
});

router.post("/movies/delete", async (req, res, next) => {
  try {
    const movie_id = Object.keys(req.body)[0];
    console.log("delete movie", movie_id);

    const movieId = await myDB.deleteMovie(movie_id);
    console.log("inserted id", movieId);

    res.redirect("/movies");
  } catch (err) {
    next(err);
  }
});

module.exports = router;
