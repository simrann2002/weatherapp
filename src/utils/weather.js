const request = require('request')

const weather = (latitide, longitude, callback) => {
    const url2 = 'https://api.openweathermap.org/data/2.5/weather?lat=' + latitide + '&lon=' + longitude + '&appid=1b4907bedd30bfff98cbffaa440e697b&units=metric'

    request({ url: url2, json: true }, (errorfromserver, datafromserver) => {
        if (errorfromserver) {
            callback('Unable to connect weather service!', undefined)
        } else if (datafromserver.body.message) {
            callback('Unable to find location!', undefined)
        } else {
            callback(undefined, {
                temperature: datafromserver.body.main.temp,
                humidity: datafromserver.body.main.humidity,
                description: datafromserver.body.weather[0].description
            })
        }
    })
}

module.exports = {
    weather: weather,
}