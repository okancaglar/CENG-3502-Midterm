const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const DBSOURCE = path.join(__dirname, "..", "database.sqlite");

const db = new sqlite3.Database(DBSOURCE, (err) => {
    if(err) {
        console.error("Database instance cannot created: " + err);
        process.exit(1);
    }
    console.log("database is created successfully!");

    db.run('CREATE TABLE IF NOT EXISTS Landmark (\n' +
        '  id          INTEGER PRIMARY KEY AUTOINCREMENT,\n' +
        '  name        TEXT,\n' +
        '  latitude    REAL    NOT NULL,\n' +
        '  longitude   REAL    NOT NULL,\n' +
        '  description TEXT,\n' +
        '  category    TEXT\n' +
        ')', (err) => {
        if (err) {
            console.error("Landmark table cannot be created, " + err);
            process.exit(1);
        }
        console.log("Landmark table is created!");
    });

    db.run("\n" +
        "CREATE TABLE IF NOT EXISTS VisitedLandmark (\n" +
        "  landmark_id   INTEGER PRIMARY KEY,      -- now the PK\n" +
        "  visited_date  TEXT    NOT NULL,         -- ISO‑8601 string\n" +
        "  visitor_name  TEXT,\n" +
        "  FOREIGN KEY (landmark_id) REFERENCES Landmark(id)\n" +
        ")",  (err) => {
        if (err) {
            console.error("VisitedLandmark table cannot be created," + err);
            process.exit(1);
        }
        console.log("VisitedLandmark created successfully");
    });

    console.log("Database creation finished successfully!");
});

module.exports = db;

