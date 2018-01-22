const mysql = require('promise-mysql')


const connectionString = process.env.JAWSDB_MARIA_URL
  || 'mysql://root@localhost:3306/btotm'

const paramsString = '?multipleStatements=true&connectionLimit=10'

const pool = mysql.createPool(`${connectionString}${paramsString}`)

const procs = require('./procs')
const call = require('./call')(pool, procs)

module.exports = { pool, call }

