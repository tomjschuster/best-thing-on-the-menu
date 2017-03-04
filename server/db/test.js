const pool = require('./index')

pool.query('show tables').then((rows) => console.log(rows)).catch(console.error)
