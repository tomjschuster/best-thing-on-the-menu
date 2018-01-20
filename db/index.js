const mysql = require('promise-mysql')

// let config;
// if (process.env.NODE_ENV === 'development') {
//   config = {
//     host: process.env.DB_HOST || 'localhost',
//     user: process.env.DB_USER || 'root',
//     database: process.env.DB_NAME || 'btotm',
//     connectionLimit: 10,
//     multipleStatements: true
//   }
// }

// const pool = mysql.createPool({
//   host: process.env.DB_HOST || 'localhost',
//   user: process.env.DB_USER || 'root',
//   database: process.env.DB_NAME || 'btotm',
//   connectionLimit: 10,
//   multipleStatements: true
// })

const connectionString = process.env.JAWSDB_MARIA_URL || 'mysql://root@localhost:3306/btotm'
const pool = mysql.createPool(`${connectionString}?multipleStatements=true&connectionLimit=10`)

const procs = require('./procs')
const call = require('./call')(pool, procs)

module.exports = { pool, call }

