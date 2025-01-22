var express = require("express");
var router = express.Router();

require("../models/connection");
const moment = require("moment");
const Trip = require("../models/trips");

router.get("/search/:departure/:arrival/:date", (req, res) => {
  const { departure, arrival, date } = req.params;

  const startDate = moment(date, "YYYY-MM-DD").startOf("day").toDate();
  const endDate = moment(date, "YYYY-MM-DD").endOf("day").toDate();

  Trip.find({
    departure: new RegExp(departure, "i"),
    arrival: new RegExp(arrival, "i"),
    date: { $gte: startDate, $lte: endDate }, // Recherche par plage de dates
  })
    .then((trips) => {
      if (trips.length > 0) {
        res.json({ result: true, trips });
      } else {
        res.json({ result: false, error: "No trip found" });
      }
    })
    .catch((err) =>
      res.status(500).json({ result: false, error: err.message })
    );
});

module.exports = router;
