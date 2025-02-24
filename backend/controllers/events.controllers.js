const { selectEvents } = require("../models/events.models");

exports.getEvents = (req, res, next) => {
  selectEvents()
    .then((result) => {
      const events = result[0];

      res.status(200).send({ events });
    })
    .catch((err) => {
      next(err);
    });
};
