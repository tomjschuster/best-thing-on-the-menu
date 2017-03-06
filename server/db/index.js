
const mysql = require('promise-mysql')
const { procs } = require('../config')
const { callMysql } = require('../utilities')

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'btotm',
  connectionLimit: 10,
  multipleStatements: true
})

const call = callMysql(procs)

module.exports = { pool, call}

