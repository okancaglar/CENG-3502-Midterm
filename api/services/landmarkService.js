const SQL_CREATE_LANDMARK = `
  INSERT INTO Landmark
    (name, latitude, longitude, description, category)
  VALUES
    (?, ?, ?, ?, ?);
`;

const SQL_READ_LANDMARK_BY_ID = `
  SELECT *
    FROM Landmark
   WHERE id = ?;
`;

const SQL_READ_ALL_LANDMARKS = `
  SELECT *
    FROM Landmark;
`;

const SQL_UPDATE_LANDMARK = `
  UPDATE Landmark
     SET name        = ?,
         latitude    = ?,
         longitude   = ?,
         description = ?,
         category    = ?
   WHERE id = ?;
`;
const SQL_DELETE_LANDMARK = `
  DELETE
    FROM Landmark
   WHERE id = ?;
`;

function createLandmark(db, data, callback) {

    db.run(SQL_CREATE_LANDMARK, data, (err) => {
        if (err) {
            console.log("landmark object cannot be created, " + err);
            callback(err);
            return;
        }
        console.log("new landmark object is created");
        callback(null);
    });
}

function updateLandmark(db, data, callback) {

    db.run(SQL_UPDATE_LANDMARK, data, function (err) {
        if (err) {
            console.log("landmark object cannot be updated, " + err);
            callback(err);
            return;
        }
        if (this.changes === 0) {
            callback(null, 0);
            return;
        }
        console.log("landmark object is updated");
        callback(null, this.changes);
    });
}

function deleteLandmark(db, id, callback) {

    db.run(SQL_DELETE_LANDMARK, [id], function (err) {
        if (err) {
            console.error("sql error, " + err);
            callback(err, 0);
            return;
        }
        if (this.changes === 0)
        {
            console.log("there is no landmark for id: " + id);
            callback(null, this.changes);
            return;
        }
        console.log("landmark object is deleted");
        callback(null, this.changes);
    });
}

function getAllLandmarks(db, callback) {

    db.all(SQL_READ_ALL_LANDMARKS, [], (err, rows) => {
        if (err) {
            console.error("sql error, " + err);
            callback(err, null);
            return;
        }
        if (rows.length === 0) {
            console.log("there is no landmark exist!");
            callback(null, null);
            return;
        }
        console.log("get operation is successful!");
        callback(null, rows);
    });
}

function getLandmark(db, id, callback) {

    db.get(SQL_READ_LANDMARK_BY_ID, [id], (err, row) => {
        if (err) {
            console.log("sql exception, " + err);
            callback(err, null);
            return;
        }
        if (!row) {
            console.log("landmark object is not found, " + err);
            callback(null, null);
            return;
        }
        console.log("get operation is successful!");
        callback(null, row);
    });
}

module.exports = {createLandmark, updateLandmark, deleteLandmark, getLandmark, getAllLandmarks};



