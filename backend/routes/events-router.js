const {
  getEvents,
  getEventById,
  postEvent,
} = require("../controllers/events.controllers");

const eventsRouter = require("express").Router();

eventsRouter
  .route("/")
  .get((req, res, next) => {
    getEvents(req, res, next);
  })
  .post((req, res, next) => {
    postEvent(req, res, next);
  });

eventsRouter.route("/:event_id").get((req, res, next) => {
  getEventById(req, res, next);
});

module.exports = eventsRouter;
