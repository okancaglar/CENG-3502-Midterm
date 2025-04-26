function createErrorResponse(msg)
{
    return {message: msg, status:"failed"};
}

function createSuccessResponse(body) {

    return {...body, status:'success'};
}

module.exports = {createErrorResponse, createSuccessResponse};