

const visitedRouter = require("express").Router();
const {createVisitedLandmarkController, getVisitedLandmarksController, getVisitedLandmarkController} = require("../controllers/visitedLandmarkController");



/*
* Visited Landmarks:
• POST /visited → Record a visited landmark.
• GET /visited → Retrieve visit history.
• GET /visited/{id} → Retrieve visit history for a specific landmark.*/

visitedRouter.post("/", createVisitedLandmarkController);
visitedRouter.get("/", getVisitedLandmarksController);
visitedRouter.get("/:id", getVisitedLandmarkController);


module.exports = {visitedRouter};