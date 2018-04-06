const Sequelize = require('sequelize')
const zipcodes = require('zipcodes')
const db = require('../db')

const Bathroom = db.define('bathroom', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
    }
  },
  location: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  borough: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  zip: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  coords: {
    type: Sequelize.JSON,
    allowNull: false,
  }
})

Bathroom.findClosest = async zip => {
  let bathroom = []
  let closestZips = await zipcodes.radius(zip, 2.5)

  for (let i = 0; i < closestZips.length; i++) {
    const zipCode = closestZips[i]
    let bathroomsToAdd = await Bathroom.findAll({where: {zip: zipCode}})
    console.log(bathroomsToAdd)
    for (let j = 0; j < bathroomsToAdd.length; j++) {
      if (bathroomsToAdd[j]) {
       bathroom.push(bathroomsToAdd[j].dataValues)
      }
    }
  }
  return bathroom
}

module.exports = Bathroom
