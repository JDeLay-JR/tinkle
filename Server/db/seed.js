const soda = require('soda-js')
var bathromAPI = new soda.Consumer('data.cityofnewyork.us');
const firebase = require('firebase/app');
const {firebaseConfig} = require('../../secrets')
const firestore = require('firebase/firestore');
const {mapKey} = require('../../secrets')
let Geocoder = require('@google/maps').createClient({key: mapKey, Promise: Promise})

firebase.initializeApp(firebaseConfig)
const db = firebase.firestore();

//Function that grabs all the usable data from the API and writes it to firestore(unstructured)
//Can add optional .limit() after .withDataset() for testing

const seedUnformattedData = () => {
  bathromAPI.query()
  .withDataset('r27e-u3sy')
  .getRows()
    .on('success', function(rows) {
      rows.forEach(element => {
        db.collection('raw_bathroom_data').add({...element})
          .then(entry => console.log('Document written with ID: ', entry.id))
        })
    })
    .on('error', function(error) { console.error(error); });
}

//Reference to the raw data collection after seedUnformattedData runs
const raw_bathroom_data = db.collection('raw_bathroom_data');


//Takes an unstructured bathroom object, geocodes it, and returns a properly structured bathroom object
let structureBathroom = async doc => {
  try {
    let bathroom = await doc.data()
    const address = `${bathroom.name}, ${bathroom.location}, ${bathroom.borough}, NY`
    const geocodeOutput = await Geocoder.geocode({address}).asPromise()
    let response = await geocodeOutput.json.results[0]
    if (response) {
      let formattedAddress = await response.formatted_address
      let coords = await response.geometry.location
      let formattedDataObj = {
          name: bathroom.name,
          address: formattedAddress,
          coords: coords
        }
      return formattedDataObj
    }
  } catch (err) {
    console.error(err)
  }
}

//Returns an array of properly stuctured bathroom objects ready to be written to firestore
let seedFormattedData = async () => {
  try {
    const unformattedData = await raw_bathroom_data.get()
    unformattedData.forEach(async doc => {
      let formattedBathroom = await structureBathroom(doc)
      //Checks to make sure the obj isn't empty, geocode sometimes returns empty objs
        db.collection('NYC').add(formattedBathroom)
        .then(entry => {console.log('Document written with ID: ', entry.id)})
    })
  } catch (err) {
    console.error(err)
  }
}

//Uncomment to requery NYC public data and reseed firestore
//Don't do this often, we will hit the firestore limit

// seedUnformatted()
// seedFormattedData()

