const {
  selectEvents,
  selectEventById,
  insertEvent,
} = require("../models/events.models");

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

exports.getEventById = (req, res, next) => {
  const { event_id } = req.params;

  selectEventById(event_id)
    .then((e) => {
      res.status(200).send({ event: e });
    })
    .catch((err) => {
      next(err);
    });
};

exports.postEvent = (req, res, next) => {
  const newEvent = req.body;

  insertEvent(newEvent)
    .then((event) => {
      res.status(201).send({ event });
    })
    .catch((err) => {
      next(err);
    });
};
