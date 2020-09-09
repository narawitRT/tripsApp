const express = require('express');
const cors = require('cors')
const axios = require('axios');

const app = express();
app.use(cors())

app.get('/trips', async (req, res) => {
    let responseTrips = [];
    let URL = "http://localhost:9000/trips";
    let trips = await axios.get(URL).catch(error => {
        console.log(error);
    });
    trips.data.forEach(function (trip) {
        responseTrips.push(trip);
    });
    res.status(200).json(responseTrips);
});

app.get('/trips/keyword/:keyword', async (req, res) => {

    let keyword = req.params.keyword;
    let responseTrips = [];
    let URL = "http://localhost:9000/trips";

    if(checkParams([keyword])){
        responseTrips = await tripFilter(URL, keyword, "keyword")
    }
    res.status(200).json(responseTrips);

});

app.get('/trips/tags/:tags', async (req, res) => {

    let tags = req.params.tags;
    let responseTrips = [];
    let URL = "http://localhost:9000/trips";

    if(checkParams([tags])){
        responseTrips = await tripFilter(URL, tags, "tags")
    }
    res.status(200).json(responseTrips);

});

async function tripFilter(URL, keyword, searchType) {
    let responseTrips = [];

    let trips = await axios.get(URL).catch(error => {
        console.log(error);
    });

    trips.data.forEach(function (trip) {
        if (searchType == "keyword") {
            if (trip.title.includes(keyword) || trip.description.includes(keyword)) {
                responseTrips.push(trip);
            }
        } else if (searchType == "tags") {
            trip.tags.forEach(function (tag) {
                if (tag.includes(keyword)) {
                    responseTrips.push(trip);
                }
            });
        }
    });
    return responseTrips;
}

function checkParams(params) {
    let isValid = true;
    params.forEach(function (param) {
        if (param === null || param === '' || param === undefined) {
            isValid = false;
        }
    });
    return isValid;
}

module.exports = app;