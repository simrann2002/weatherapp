const path = require('path')
const expres = require('express')
const hbs = require('hbs')
const geocodeobj = require('./utils/geocode')
const weatherobj = require('./utils/weather')


const app = expres()


// Defining paths for express configuration
// console.log(path.join(__dirname,'../public'))
const pathTopublic = path.join(__dirname, '../public')            //path to public library
const pathToviews = path.join(__dirname, '../templates/views')  //views is like template in django
const partialPath = path.join(__dirname, '../templates/partials')


// Setup of handlebar-engine and views
app.set('view engine', 'hbs')                  //setting template engine for dynamic pages
app.set('views', pathToviews)
hbs.registerPartials(partialPath)



// Setup static directory to serve static files(images,javascript,css) 
app.use(expres.static(pathTopublic))                    //for serving static files like images



app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Simran Godhwani with ❤️'
    })
})


app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Simran Godhwani with ❤️'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Please provide address'
        })
    }

    geocodeobj.geocode(req.query.address, (errorfromgeocode, responsefromgeocode) => {
        if (errorfromgeocode) {
            return res.send({
                error: errorfromgeocode
            })
        }

        weatherobj.weather(responsefromgeocode.latitude, responsefromgeocode.longitude, (errorfromweather, responsefromweather) => {
            if (errorfromweather) {
                return res.send({
                    error: errorfromweather
                })
            }
            res.send({
                forecast: responsefromweather.description,
                temperature: responsefromweather.temperature,
                humidity: responsefromweather.humidity,
                location: responsefromgeocode.location,
                address: req.query.address
            })
        })

    })

})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Simran Godhwani with ❤️',
        message: 'Enter address of any location and get weather information.This website uses geocode API to get latitude and longitude and OpenWeather API to get wether information.'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Simran Godhwani with ❤️',
        errormessage: 'Help article not found!'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Simran Godhwani with ❤️',
        errormessage: 'Page not found!'
    })
})



app.listen(3000, () => {
    console.log('server is on 3000')
})