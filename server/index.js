const Express = require('express')
const bodyParser = require('body-parser')
const compression = require('compression')
const zipcodes = require('zipcodes')
const db = require('../server/db/db')
const {mapKey} = require('../secrets')
const NodeGeocoder = require('node-geocoder');
const {Bathroom} = require('../server/db/models')
const app = new Express()
const PORT = 3000;

const options = {
  provider: 'google',

  // Optional depending on the providers
  httpAdapter: 'https', // Default
  apiKey: mapKey, // for Mapquest, OpenCage, Google Premier
  formatter: null         // 'gpx', 'string', ...
};
const geocoder = NodeGeocoder(options);



app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// compression middleware
app.use(compression())
app.get('/test', (req, res, next) => {
  res.json('TEST PASSED')
})
app.post('/getBathrooms', async (req, res, next) => {
  const userLatLng = {lat: parseFloat(req.body.latitude), lon: parseFloat(req.body.longitude)};
  try {
    const userLocation = await geocoder.reverse(userLatLng)
    const userAddress = userLocation[0].formattedAddress.split(',')
    const userZip = userAddress[userAddress.length - 2].split(' ')[2]
    let closestBathrooms = await Bathroom.findClosest(userZip)
    res.send(closestBathrooms)
  } catch (err) {
    next(err)
  }
})

app.use((err, req, res, next) => {
  console.error(err)
  console.error(err.stack)
  res.status(err.status || 500).send(err.message || 'Internal server error.')
})

app.listen(PORT, async () => {
  await db.sync({ force: false })
  console.log(`Listening on Port ${PORT}`)
})


module.exports = app;
