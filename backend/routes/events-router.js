const { getEvents } = require("../controllers/events.controllers");

const eventsRouter = require("express").Router();

eventsRouter.route("/").get((req, res, next) => {
  getEvents(req, res, next);
});

module.exports = eventsRouter;
