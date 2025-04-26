const db = require("../db/db");
const {createLandmark, updateLandmark, deleteLandmark, getLandmark, getAllLandmarks}
    = require("../services/landmarkService");

const {createErrorResponse, createSuccessResponse} = require("../helper/responseMessage");


/*
* A Landmark should include:
• id (unique identifier)
• name
• location (latitude and longitude)
• description
• category (e.g., historical, natural, cultural)*/

const rules = {
    name: {required:false, type:'string'},
    longitude: {required:true, type:'float'},
    latitude:{required:true, type:'float'},
    description: {required:false, type:'string'},
    category: {required:false, type:'sting'}
}

function createLandmarkController(req, res, next) {

    if (!validateLandmark(req.body)){
        res.status(400).json(createErrorResponse("invalid request fields!"));

    }
    parsedData = parseRequestData(req.body);
    createLandmark(db, parsedData, (err) => {
        if (err) {
            res.status(400).json(createErrorResponse(err));
        }
        res.status(200).json(createSuccessResponse({message: "landmark is created successfully"}));
    });
}

function getLandmarkController(req, res, next) {

    getLandmark(db, req.params.id, (err, row) => {

        if (err) {
            res.status(500).json(createErrorResponse("internal server error, sql"));
        }
        if (!row){
            res.status(400).json(createErrorResponse("user is not found!"));

        }
        res.status(200).json(createSuccessResponse(row));
    });
}

function getLandmarksController(req, res, next) {

    getAllLandmarks(db, (err, rows) => {

        if (err) {
            res.status(500).json(createErrorResponse("internal server error, sql"));
        }

        if (rows.length === 0) {
            res.status(400).json(createErrorResponse("landmark objects are not exist!"));
        }

        res.status(200).json(createSuccessResponse(rows));
    });
}
function updateLandmarkController(req, res, next) {

    if (!validateLandmark(req.body)) {
        return res.status(400).json(createErrorResponse("invalid fields!"));
    }
    parsedData = parseRequestData(req.body);

    updateLandmark(db, [...parsedData, req.params.id],(err, changedRows) => {

        if (err) {
            res.status(500).json(createErrorResponse("internal server error!"))
        }
        if (changedRows === 0)
        {
            res.status(400).json(createErrorResponse("landmark object is not found!"));
        }
        res.status(200).json(createSuccessResponse({"message" : changedRows + " rows is changed"}));
    });
}


function deleteLandmarkController(req, res, next) {

    deleteLandmark(db, req.params.id, (err, deletedRows) => {

        if (err) {
            res.status(500).json(createErrorResponse("internal server error!"));
            return;
        }
        if (deletedRows === 0) {
            res.status(404).json(createErrorResponse("invalid landmark id: " + req.params.id));
            return;
        }

        res.status(200).json(createSuccessResponse({message: "landmark deleted, id: " + req.params.id}));
        return;
    });
}


function validateLandmark(data) {

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



function parseRequestData(request){

    return [request["name"], request["latitude"], request["longitude"], request["description"],
        request["category"]];
}





module.exports = {createLandmarkController, getLandmarkController, getLandmarksController, updateLandmarkController, deleteLandmarkController};

