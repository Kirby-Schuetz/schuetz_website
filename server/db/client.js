// Require Client from pg
const { Client } = require('pg')

//Establishing connect to database (like how we do with http://)
const dbName = 'schuetzsite'
const client = new Client(`postgres://localhost:5432/${schuetzsite}`)

//Export for use in other files
module.exports = client;
