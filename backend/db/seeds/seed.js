const format = require('pg-format');
const db = require('../connection');

const seed = ({ eventsData, hostsData }) => {
    return db
        .query(`DROP TABLE IF EXISTS events;`)
        .then(() => {
            db.query(`DROP TABLE IF EXISTS hosts;`)
        })
        .then(() => {
            const eventsTablePromise = db.query(`
                CREATE TABLE events (
                    event_id SERIAL PRIMARY KEY,
                    city VARCHAR NOT NULL,
                    description VARCHAR NOT NULL,
                    host INT REFERENCES hosts(host_id) ON DELETE CASCADE,
                    date DATE NOT NULL,
                    time TIME NOT NULL
                );
            `)
        })
}