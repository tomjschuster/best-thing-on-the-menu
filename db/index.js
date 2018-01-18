const mysql = require('promise-mysql')

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  database: process.env.DB_NAME || 'btotm',
  connectionLimit: 10,
  multipleStatements: true
})

const procs = require('./procs')
const call = require('./call')(pool, procs)

module.exports = { pool, call }

