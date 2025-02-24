const testData = require("../db/data/test-data/index");
const app = require("../app");
const seed = require("../db/seeds/seed");
const db = require("../db/connection");
const request = require("supertest");

beforeEach(() => seed(testData));

afterAll(() => {
  return db.end();
});

describe("GET /api/events", () => {
  test("returns array of event objects with correct properties", () => {
    return request(app)
      .get("/api/events")
      .expect(200)
      .then((response) => {
        const events = response.body.events;

        expect(Array.isArray(events)).toBe(true);

        for (e of events) {
          console.log(e);
          expect(e).toMatchObject({
            title: expect.any(String),
            location: expect.any(String),
            image: expect.any(String),
            description: expect.any(String),
            date: expect.any(String),
            time: expect.any(String),
          });
        }
      });
  });
});
