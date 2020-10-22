var express = require("express");
var router = express.Router();

const myDB = require("../db/myDB.js");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/cars", async (req, res, next) => {
  try {
    const carName = req.query.carName || "";

    const cars = await myDB.getCars(carName);

    res.render("cars", {
      cars: cars,
      carName: carName,
    });
  } catch (err) {
    next(err);
  }
});

router.post("/cars/create", async (req, res, next) => {
  try {
    const car = req.body;
    console.log("create car", car);

    const carId = await myDB.insertCar(car);
    console.log("inserted id", carId);

    res.redirect("/cars");
  } catch (err) {
    next(err);
  }
});

module.exports = router;
