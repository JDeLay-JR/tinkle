const soda = require('soda-js');
const dataset = 'h87e-shkn'

let bathroomDatabase = new soda.Consumer('data.cityofnewyork.us')


bathroomDatabase.query()
  .withDataset(`${dataset}`)
  .limit(5)
  .getRows()
    .on('success', function(rows) {console.log(rows)})
    .on('error', function(error) {console.error(error)});
