const Sequelize = require('sequelize')
const DBNAME = 'tinkle'


const db = new Sequelize(
  process.env.DATABASE_URL || `postgres://localhost:5432/${DBNAME}`, {
    logging: false
  }
)

module.exports = db
