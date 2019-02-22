var express = require('express');
var router = express.Router();

const Flight = require('../../models/flight');
const modifyDate = require('../../utils/dates');

/* GET flights/oneway listing. */
router.get('/oneway', function (req, res, next) {
  const flightToFind = req.query;
  console.log(flightToFind);
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;

  const modifiedDepDate = modifyDate(flightToFind.dep_date);

  const flightQuery = Flight.find({ dep_date: modifiedDepDate, departure: flightToFind.departure, arrival: flightToFind.arrival });
  let fetchedflights;

  if(pageSize && currentPage) {
    flightQuery
      .skip(pageSize * (currentPage - 1))
      .limit(pageSize);
  }
    
  flightQuery.then(documents => {
    fetchedflights = documents;
    return Flight.countDocuments();
  })
  .then(count => {
    res.status(200).json({
      message: "Flights fetched successfully!",
      flights: fetchedflights,
      maxFlights: count
    })
  });
});

/* GET flights/oneway listing. */
router.get('/roundtrip', function (req, res, next) {
  const flightToFind = req.query;
  console.log(flightToFind);
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;

  const modifiedDepDate = modifyDate(flightToFind.dep_date);
  const modifiedArrDate = modifyDate(flightToFind.arr_date);

  const depFlightQuery = Flight.find({ dep_date: modifiedDepDate, departure: flightToFind.departure, arrival: flightToFind.arrival});
  const arrFlightQuery = Flight.find({ dep_date: modifiedArrDate, departure: flightToFind.arrival, arrival: flightToFind.departure});

  let fetchedDepFlights;
  let fetchedArrFlights;

  /*if(pageSize && currentPage) {
    flightQuery
      .skip(pageSize * (currentPage - 1))
      .limit(pageSize);
  }*/

  depFlightQuery.then(documents => {
    fetchedDepFlights = documents;
  });

  arrFlightQuery.then(documents => {
    fetchedArrFlights = documents;
  })
  .then( () => {
    console.log(fetchedDepFlights);
    console.log(fetchedArrFlights);
    res.status(200).json({
      message: "Flights fetched successfully!",
      origin: fetchedDepFlights,
      destination: fetchedArrFlights,
      maxFlights: 10
    })
  });
});

 
module.exports = router;