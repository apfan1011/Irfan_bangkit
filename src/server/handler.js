const predictCancer = require("../services/inferenceservice");
const crypto = require('crypto');
const storeData = require("../services/storedata");
const getHistories = require("../services/getdata");

async function postPredictHandler(request, h) {
    const { image } = request.payload;
    const { model } = request.server.app

    const { suggestion, label } = await predictCancer(model, image);
    const id = crypto.randomUUID();
    const createdAt = new Date().toISOString();

    const data = {
        "id": id,
        "result": label,
        "suggestion": suggestion,
        "createdAt": createdAt
    }

    await storeData(id, data);

    const response = h.response({
        status: 'success',
        message: 'Model is predicted successfully',
        data
    })
    response.code(201);
    return response;
}

async function getHistoriesHandler(request, h) {
    const histories = await getHistories();
    const response = h.response({
        status: 'success',
        data: histories,
    })
    return response.code(200);
}

module.exports = { postPredictHandler, getHistoriesHandler };