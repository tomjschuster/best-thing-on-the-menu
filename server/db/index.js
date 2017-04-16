
const mysql = require('promise-mysql')
const { procs } = require('../config')
const { callMysql } = require('../utilities')

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  database: process.env.DB_NAME || 'btotm',
  connectionLimit: 10,
  multipleStatements: true
})

const call = callMysql(pool, procs)
module.exports = { pool, call }

