const soda = require('soda-js')
var bathromAPI = new soda.Consumer('data.cityofnewyork.us');
const firebase = require('firebase/app');
const {firebaseConfig} = require('../../secrets')
const firestore = require('firebase/firestore');
const {mapKey} = require('../../secrets')
let Geocoder = require('@google/maps').createClient({key: mapKey, Promise: Promise})
const {Bathroom, Unstructured} = require('../db/models')
const db = require('../db')

// firebase.initializeApp(firebaseConfig)
// const db = firebase.firestore();

//Function that grabs all the usable data from the API and writes it to db(no geocode yet)
//Can add optional .limit() after .withDataset() for testing

const seedAPIData = async () => {
  db.sync({force: true})
  try {
    let apiData = await bathromAPI.query().withDataset('r27e-u3sy').getRows()
    apiData.on('success', async function(rows) {
      try {
        let data = await rows
        data.forEach(async element => {
          let dbEntry = await Unstructured.create(element)
          console.log(`Wrote data into db ${dbEntry.id}`)
        })
      } catch (err) {
        console.error(err.message)
        console.error(err.stack)
      }
    })
  } catch (err) {
    console.error(err.message)
    console.error(err.stack)
  }
}

const geocodeData = async () => {
  // let synced = db.sync({force: true})
  console.log('DB has synced!')
  try {
    let bathrooms = await Unstructured.findAll()
    bathrooms.forEach(async bathroom => {
      const address = `${bathroom.name}, ${bathroom.address}, ${bathroom.borough}, NY`
      const geocodeOutput = await Geocoder.geocode({address}).asPromise()
      const response = await geocodeOutput.json.results[0]
      if (!response) {console.log("ERROR!")}
      const formattedAddress = response.formatted_address
      const arrOfAddressInfo = formattedAddress.split(',')
      const coords = response.geometry.location
      const zip = arrOfAddressInfo[arrOfAddressInfo.length - 2].split(' ')[2]
      const dbEntry = await Bathroom.create({
        name: bathroom.name,
        location: formattedAddress,
        borough: bathroom.borough,
        zip,
        coords: coords
      })
      console.log(`Wrote the entry with ID: ${dbEntry.id}`)

    })
  } catch (err) {
    console.error(err.message)
    console.error(err.stack)
  }
}

//Calls the seed
// seedAPIData()
geocodeData()

