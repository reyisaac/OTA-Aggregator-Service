var express = require('express');
var router = express.Router();

/* GET flights listing. */
router.get('/', function (req, res, next) {
  const flightToFind = req.query;
  console.log(flightToFind);
  // dummy data
  const flights = [{
      id: '1',
      airline_name: 'Lufthansa',
      date: 'Jan 30 2019',
      time: '7:35 PM - 5:20 PM',
      route: 'MIA-HKG',
      price: '$2,153'
    },
    {
      id: '2',
      airline_name: 'American',
      date: 'Jan 30 2019',
      time: '8:35 PM - 5:20 PM',
      route: 'MIA-HKG',
      price: '$1,553'
    },
    {
      id: '3',
      airline_name: 'Austrian',
      date: 'Jan 30 2019',
      time: '10:00 PM - 5:20 PM',
      route: 'MIA-HKG',
      price: '$1,253'
    },
    {
      id: '4',
      airline_name: 'American',
      date: 'Jan 30 2019',
      time: '8:35 PM - 5:20 PM',
      route: 'MIA-HKG',
      price: '$1,553'
    },
    {
      id: '5',
      airline_name: 'Austrian',
      date: 'Jan 30 2019',
      time: '10:00 PM - 5:20 PM',
      route: 'MIA-HKG',
      price: '$1,253'
    }
  ];
  res.status(200).json({message: 'flights fetched successully!', flights: flights});
});

module.exports = router;