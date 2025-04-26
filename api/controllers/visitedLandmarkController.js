const db = require("../db/db");

const {createVisitedLandmark, getVisitedLandmarks, getVisitedLandmark} = require("../services/visitedLandmarkService");
const {createSuccessResponse, createErrorResponse} = require("../helper/responseMessage");
const {getLandmark} = require("../services/landmarkService");


const rules = {
    landmarkId: {required: true, type: "integer"},
    visitorName: {required:false, type:"string"}
};


function createVisitedLandmarkController(req, res, next) {

    if (!validateData(req.body)){
        res.status(400).json(create);
    }
    parsedData = parseValidatedData(req.body);

    createVisitedLandmark(db, parsedData, (err) => {

        if (err) {
            res.status(500).json(createErrorResponse("internal server error"));
        }else {
            res.status(200).json(createSuccessResponse({message: "visited landmark created successfully"}));
        }
    });
}

function getVisitedLandmarksController(req, res, next) {

    getVisitedLandmarks(db, (err, rows) => {
        if (err) {
            res.status(500).json(createErrorResponse("internal server error"));
        }
        else if (rows.length == 0) {
            res.status(400).json(createErrorResponse("Visited landmark is not exist"));
        }else {
            res.status(200).json(rows);
        }
    });
}


function getVisitedLandmarkController(req, res, next) {

    getLandmark(db, req.params.id, (err, row) => {
        if (err) {
            res.status(500).json(createErrorResponse("internal server error"));
        }
        else if (!row) {
            res.status(400).json(createErrorResponse("Visited landmark is not exist"));
        }else {
            res.status(200).json(row);
        }
    });
}

function validateData(data) {

    for(const [field, rule] of Object.entries(rules)){
        const val = data[field];

        if (rule.required && (val === undefined || val === "")) {
            return false;
        }

        if (rule.type === "string" && typeof val !== "string") {
            return false;
        }
        else if ((rule.type ==="int" || rule.type === "float") && typeof val !== "number") {
            return false;
        }
    }

    return true;
}

function parseValidatedData(request){

    return [request["id"], new Date().toISOString(), request["name"]];
}


module.exports = {createVisitedLandmarkController, getVisitedLandmarksController, getVisitedLandmarkController};

