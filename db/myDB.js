const sqlite3 = require("sqlite3").verbose();
const { promisify } = require("util");

const dbName = "./db/TBMDB.sqlite3";

function MyDB() {
  const myDb = {};

  async function insertPerson(person) {

    const db = new sqlite3.Database(dbName);

    const query = `INSERT INTO People (first_name, last_name, age)
    VALUES ($first_name, $last_name, $age)
    `;

    return new Promise((resolve, reject) => {
      db.run(query, person.first_name, person.last_name, person.age, function (err) {
        if (err) {
          return reject(err);
        }
        console.log("promise", this);
        resolve(this.lastID);
      });
    }).finally(() => db.close());
  }

  async function insertMovie(movie) {

    const db = new sqlite3.Database(dbName);

    const query = `INSERT INTO Movies (title, box_office, release_date, studio_id, user_rating, director_id, genre_id, country_id, rating_id, language_id)
    VALUES ($title, $box_office, $release_date, $studio_id, $user_rating, $director_id, $genre_id, $country_id, $rating_id, $language_id)
    `;

    return new Promise((resolve, reject) => {
      db.run(query, movie.title, movie.box_office, movie.release_date, movie.studio_id, movie.user_rating, 
        movie.director_id, movie.genre_id, movie.country_id, movie.rating_id, movie.language_id, 
        function (err) {
        if (err) {
          return reject(err);
        }
        console.log("promise", this);
        resolve(this.lastID);
      });
    }).finally(() => db.close());
  }

  async function getPeople(first_name, last_name) {
    console.log("Connecting to the database on ", dbName);
    const db = new sqlite3.Database(dbName);

    const query = `SELECT p.people_id, p.first_name AS first_name, p.last_name AS last_name FROM People AS p
    WHERE first_name LIKE $first_name AND last_name LIKE $last_name;
    `;

    const params = {
      $first_name: first_name + "%", 
      $last_name: last_name + "%",
    };

    const promise = promisify(db.all.bind(db));

    return promise(query, params).finally(() => db.close());
  }

  // Fetches all movies that fit the title search parameter
  async function getMovies(title) {
    console.log("Connecting to the database on ", dbName);
    const db = new sqlite3.Database(dbName);

    const query = `SELECT * FROM Movies AS m
    WHERE title LIKE $title;
    `;

    const params = {
      $title: "%" + title + "%",
    };

    const promise = promisify(db.all.bind(db));

    return promise(query, params).finally(() => db.close());
  }


  // Fetches one movie by its ID
  async function getMovie(movie_id) {
    console.log("Connecting to the database on ", dbName);
    const db = new sqlite3.Database(dbName);

    const query = `SELECT * FROM Movies AS m
    WHERE movie_id = $movie_id;
    `;

    const params = {
      $movie_id: movie_id,
    };

    const promise = promisify(db.all.bind(db));

    return promise(query, params).finally(() => db.close());
  }

  async function getStudios() {
    console.log("Connecting to the database on ", dbName);
    const db = new sqlite3.Database(dbName);

    const query = "SELECT s.studio_id, s.studio_name FROM Studios AS s";

    const promise = promisify(db.all.bind(db));

    return promise(query).finally(() => db.close());
  }

  async function getGenres() {
    console.log("Connecting to the database on ", dbName);
    const db = new sqlite3.Database(dbName);

    const query = "SELECT g.genre_id, g.genre FROM Genres AS g";

    const promise = promisify(db.all.bind(db));

    return promise(query).finally(() => db.close());
  }

  async function getCountries() {
    console.log("Connecting to the database on ", dbName);
    const db = new sqlite3.Database(dbName);

    const query = "SELECT c.country_id, c.country_name FROM Countries AS c";

    const promise = promisify(db.all.bind(db));

    return promise(query).finally(() => db.close());
  }

  async function getRatings() {
    console.log("Connecting to the database on ", dbName);
    const db = new sqlite3.Database(dbName);

    const query = "SELECT r.rating_id, r.rating FROM Ratings AS r";

    const promise = promisify(db.all.bind(db));

    return promise(query).finally(() => db.close());
  }

  async function getLanguages() {
    console.log("Connecting to the database on ", dbName);
    const db = new sqlite3.Database(dbName);

    const query = "SELECT l.language_id, l.language FROM Languages AS l";

    const promise = promisify(db.all.bind(db));

    return promise(query).finally(() => db.close());
  }

  async function updateMovie(movie) {
    console.log("Connecting to the database on ", dbName);
    const db = new sqlite3.Database(dbName);

    const query = `UPDATE Movies
    SET title = $title, box_office = $box_office, release_date = $release_date, studio_id = $studio_id, user_rating = $user_rating, director_id = $director_id, genre_id = $genre_id, country_id = $country_id, rating_id = $rating_id, language_id = $language_id
    WHERE movie_id = $movie_id;
    `;

    return new Promise((resolve, reject) => {
      db.run(query, movie.title, movie.box_office, movie.release_date, movie.studio_id, movie.user_rating, 
        movie.director_id, movie.genre_id, movie.country_id, movie.rating_id, movie.language_id, movie.movie_id, 
        function (err) {
        if (err) {
          return reject(err);
        }
        console.log("promise", this);
        resolve(this.lastID);
      });
    }).finally(() => db.close());
  }

  async function deleteMovie(movie_id) {
    console.log("Connecting to the database on ", dbName);
    const db = new sqlite3.Database(dbName);

    const query1 = `DELETE FROM Movies AS m
    WHERE m.movie_id = $movie_id
    `;

    const query2 = `DELETE FROM Casts AS c
    WHERE c.movie_id = $movie_id
    `;

    return new Promise((resolve, reject) => {
      db.run(query1, movie_id, function (err) {
        if (err) {
          return reject(err);
        }
        console.log("promise", this);
        resolve(this.lastID);
      });
      db.run(query2, movie_id, function (err) {
        if (err) {
          return reject(err);
        }
        console.log("promise", this);
        resolve(this.lastID);
      });
    }).finally(() => db.close());
  }

  myDb.insertPerson = insertPerson;
  myDb.insertMovie = insertMovie;
  myDb.getPeople = getPeople;
  myDb.getMovies = getMovies;
  myDb.getMovie = getMovie;
  myDb.getStudios = getStudios;
  myDb.getGenres = getGenres;
  myDb.getCountries = getCountries;
  myDb.getRatings = getRatings;
  myDb.getLanguages = getLanguages;
  myDb.updateMovie = updateMovie;
  myDb.deleteMovie = deleteMovie;

  return myDb;
}

module.exports = MyDB();
