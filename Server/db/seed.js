//Parsing Modules
const fs = require('fs');
const parse = require('xml-parser');

//Firebase Modules
const firebase = require('firebase/app');
const {firebaseConfig} = require('../../secrets')
const firestore = require('firebase/firestore');
firebase.initializeApp(firebaseConfig)

//Firestore Database
const db = firebase.firestore();

//Google Maps Modules
const {mapKey} = require('../../secrets')
let googleMapsClient = require('@google/maps').createClient({key: mapKey, Promise: Promise})

//XML Parsing Functionality
const xmlFileToParse = '/bathroomData.xml'

let parsingFunction = async (file) => {
  try {
    let arrOfLocales = []
    let data = await fs.readFileSync(__dirname + `${file}`, 'utf8')
    let obj = await parse(data);
    let root = await obj.root.children[0].children
    //CHANGE LENGTH PARAM
    for (let i = 0; i < root.length; i++) {
      let name = await root[i].children[0].content.toString()
      let location = await root[i].children[1].content.toString()
      let borough = await root[i].children[root[i].children.length - 1].content.toString();
      arrOfLocales.push(`${name}, ${location}, ${borough}, NY`)
    }
    return arrOfLocales
  } catch (err) {
    console.log(err)
  }
}

let seed = () =>
parsingFunction(xmlFileToParse)
.then(arrOfLocations => {
  arrOfLocations.forEach(async location => {
    let singleLocation = {}
    singleLocation.name = location.split(',')[0]
    await googleMapsClient.geocode({address: location}).asPromise()
    .then(geocode => {
      if (geocode.json.results !== []) {
        singleLocation.address = geocode.json.results[0].formatted_address
        singleLocation.latitude = geocode.json.results[0].geometry.location.lat
        singleLocation.longitude = geocode.json.results[0].geometry.location.lng
        }
      })
      db.collection("bathrooms").add({
            name: singleLocation.name,
            address: singleLocation.address,
            lat: singleLocation.latitude,
            long: singleLocation.longitude
          })
      .then(entry => console.log("Document written with ID: ", entry.id))
    })
})

// seed()
db.collection("bathrooms").get().then(function(querySnapshot) {
  console.log(querySnapshot.size);
});
