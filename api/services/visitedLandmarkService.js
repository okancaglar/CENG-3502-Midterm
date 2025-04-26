
const SQL_CREATE_VISITED_LANDMARK = `
  INSERT INTO VisitedLandmark
    (landmark_id, visited_date, visitor_name)
  VALUES
    (?, ?, ?);
`;


const SQL_READ_ALL_VISITED_LANDMARKS = `
  SELECT
    landmark_id,
    visited_date,
    visitor_name
  FROM VisitedLandmark;
`;

const SQL_READ_VISITED_LANDMARK_BY_LANDMARK = `
  SELECT
    landmark_id,
    visited_date,
    visitor_name
  FROM VisitedLandmark
  WHERE landmark_id = ?;
`;


function createVisitedLandmark(db, data, callback){
    db.run(SQL_CREATE_VISITED_LANDMARK, data, callback);
}
function getVisitedLandmarks(db, callback) {
    db.all(SQL_READ_ALL_VISITED_LANDMARKS, callback);
}

function getVisitedLandmark(db, id, callback) {
    db.get(SQL_READ_VISITED_LANDMARK_BY_LANDMARK, [id], callback);
}