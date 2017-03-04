const mysql = require('promise-mysql')

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'btotm',
  connectionLimit: 10
})

module.exports = pool

