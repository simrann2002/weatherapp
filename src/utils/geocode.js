const request = require('request')

const geocode = (address, callback) => {

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiZGV2d2FyZHVsZSIsImEiOiJja3Z0czNsbGYyejJzMnFvdXN6aDg4azF2In0.7sVw2qCqU0BpY0dCR9DOqQ&limit=1'
    // debugger
    request({ url: url, json: true }, (errorfromserver, datafromserver) => {
        if (errorfromserver) {
            callback('Unable to connect location service!', undefined)
        } else if (datafromserver.body.features.length == 0) {
            callback('Unable to find location.Try another search!', undefined)
        }
        else {
            callback(undefined, {
                latitude: datafromserver.body.features[0].center[1],
                longitude: datafromserver.body.features[0].center[0],
                location: datafromserver.body.features[0].place_name
            })
        }
    })
}


module.exports = {
    geocode:geocode,
}