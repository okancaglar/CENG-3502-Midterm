/*
* Landmarks:
• POST /landmarks → Add a new landmark.
• GET /landmarks → Retrieve all landmarks.
• GET /landmarks/{id} → Retrieve a specific landmark.
• PUT /landmarks/{id} → Update a landmark.
• DELETE /landmarks/{id} → Remove a landmark.

* */

const {createLandmarkController, getLandmarkController,
getLandmarksController, updateLandmarkController, deleteLandmarkController} = require("../controllers/landmarkController");




const router = require('express').Router();

router.get("/", getLandmarksController);
router.get("/:id", getLandmarkController);
router.post("/", createLandmarkController);
router.put("/:id", updateLandmarkController);
router.delete("/:id", deleteLandmarkController);

module.exports = {router};
