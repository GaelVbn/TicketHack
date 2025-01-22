var express = require('express');
var router = express.Router();

const Trip = require('../models/trips');
const Booking = require('../models/bookings');
const { checkBody } = require('../modules/checkBody');

router.post('/', (req, res) => {
  if (!checkBody(req.body, ['tripId'])) {
    res.json({ result: false, error: 'Missing trip ID' });
    return;
  }

  Trip.findById(req.body.tripId).then(trip => {
    if (trip) {
      const newBooking = new Booking({
        trip: trip._id,
        isPaid: false,
      });

      newBooking.save().then(() => {
        res.json({ result: true });
      });
    } else {
      res.json({ result: false, error: 'Trip not found' });
    }
  });
});

router.get('/', (req, res) => {
  Booking.find({ isPaid: false })
    .populate('trip')
    .then(bookings => {
      if (bookings.length > 0) {
        res.json({ result: true, bookings });
      } else {
        res.json({ result: false, error: 'No bookings found' });
      }
    });
});

router.delete('/:tripId', (req, res) => {
  Booking.deleteOne({ trip: req.params.tripId }).then(({ deletedCount }) => {
    Booking.find({ isPaid: false })
      .populate('trip')
      .then(bookings => {
        res.json({ result: deletedCount > 0, bookings });
      });
  });
});

module.exports = router;
